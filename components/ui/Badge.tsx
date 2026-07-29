import { cn } from "@/lib/cn";

const styles = `
  .lq-badge {
    font-family: var(--font-dm-sans), sans-serif;
    position: relative;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    color: rgba(29,29,31,0.6);
  }
  .lq-badge::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 999px; padding: 1px;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.80) 0%,
      rgba(255, 149, 0, 0.45) 30%,
      rgba(224, 102, 0, 0.18) 55%,
      rgba(224, 102, 0, 0.50) 80%,
      rgba(255,255,255,0.70) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
  }
  .lq-badge-dot {
    background: #f38200;
    box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: lqBadgePulse 2.4s ease-in-out infinite;
  }
  @keyframes lqBadgePulse {
    0%,100% { box-shadow: 0 0 6px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 12px rgba(255, 149, 0, .9), 0 0 0 4px rgba(255, 149, 0, 0); }
  }
`;

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "lq-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em]",
        className
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <span className="lq-badge-dot h-1.5 w-1.5 rounded-full flex-shrink-0" />
      {children}
    </span>
  );
}