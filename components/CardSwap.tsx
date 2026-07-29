import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

/* ─── Types ───────────────────────────────────────────────────────────── */
export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  className?: string;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

/* ─── Apple-style card shell ─────────────────────────────────────────── */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, style, ...rest }, ref) => (
    <div
      ref={ref}
      style={style}
      {...rest}
      className={[
        /* Position & 3-D */
        "absolute top-1/2 left-1/2",
        "[transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]",
        /* Apple card aesthetic */
        "rounded-[28px] overflow-hidden",
        "bg-white dark:bg-[#1c1c1e]",
        "border border-black/[0.06] dark:border-white/[0.08]",
        /* Layered shadow for that "lifted off white surface" feel */
        "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.04)]",
        customClass ?? "",
        rest.className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

/* ─── Slot math (unchanged) ──────────────────────────────────────────── */
type CardRef = RefObject<HTMLDivElement | null>;
interface Slot { x: number; y: number; z: number; zIndex: number }

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x, y: slot.y, z: slot.z,
    xPercent: -50, yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

/* ─── CardSwap ───────────────────────────────────────────────────────── */
const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 4,           /* reduced — Apple keeps things flatter */
  easing = "elastic",
  className,
  children,
}) => {
  /* Softer elastic — feels more like Apple's spring physics */
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.55, 0.82)",
          durDrop: 1.8,
          durMove: 1.8,
          durReturn: 1.9,
          promoteOverlap: 0.88,
          returnDelay: 0.04,
        }
      : {
          ease: "power2.inOut",
          durDrop: 0.72,
          durMove: 0.72,
          durReturn: 0.72,
          promoteOverlap: 0.45,
          returnDelay: 0.18,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = () => {
      if (order.current.length < 2) return;
      if (!refs.every((r) => r.current)) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      /* Drop front card down — slightly curved arc */
      tl.to(elFront, {
        y: "+=520",
        opacity: 0.0,
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          `promote+=${i * 0.12}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => { if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, "return");
      tl.to(
        elFront,
        {
          x: backSlot.x, y: backSlot.y, z: backSlot.z,
          opacity: 1,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );
      tl.call(() => { order.current = [...rest, front]; });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause  = () => { tlRef.current?.pause(); clearInterval(intervalRef.current); };
      const resume = () => { tlRef.current?.play(); intervalRef.current = window.setInterval(swap, delay); };
      if (node) { node.addEventListener("mouseenter", pause); node.addEventListener("mouseleave", resume); }
      return () => {
        if (node) { node.removeEventListener("mouseenter", pause); node.removeEventListener("mouseleave", resume); }
        clearInterval(intervalRef.current);
        tlRef.current?.kill();
      };
    }
    return () => { clearInterval(intervalRef.current); tlRef.current?.kill(); };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={[
        /* Same positioning as before — untouched */
        "absolute bottom-[-30px] sm:bottom-[-40px] left-1/2 -translate-x-[55%]",
        "origin-bottom perspective-[1200px] overflow-visible",
        "max-[768px]:scale-[0.75] max-[480px]:scale-[0.6]",
        "lg:bottom-[-55px] lg:left-[190px] lg:right-auto lg:translate-x-0 lg:scale-100 lg:origin-bottom-left",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;