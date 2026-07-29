import { cn } from "@/lib/cn";

// The `.lq-card` CSS lives once in app/globals.css (not injected per instance).

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Lift + brighten on hover. Off by default for static content cards. */
  hoverable?: boolean;
};

export function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        "lq-card rounded-2xl p-6",
        hoverable && "hover",
        className
      )}
    >
      {children}
    </div>
  );
}