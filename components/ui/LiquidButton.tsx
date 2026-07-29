"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

// The `.lq-btn` CSS lives once in app/globals.css (not injected per instance).

type Variant = "primary" | "secondary" | "tertiary" | "dark";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function ripple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const dot = document.createElement("span");
  dot.className = "lq-btn-ripple";
  dot.style.width = dot.style.height = `${size}px`;
  dot.style.left = `${e.clientX - rect.left - size / 2}px`;
  dot.style.top = `${e.clientY - rect.top - size / 2}px`;
  el.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove());
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, onClick, ...rest }, ref) => (
    <button
      ref={ref}
      className={`lq-btn ${variant} size-${size} ${className}`}
      onClick={(e) => {
        if (variant !== "tertiary") ripple(e);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = "primary", size = "md", className = "", children, onClick, ...rest }, ref) => (
    <a
      ref={ref}
      className={`lq-btn ${variant} size-${size} ${className}`}
      onClick={(e) => {
        if (variant !== "tertiary") ripple(e);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  )
);
ButtonLink.displayName = "ButtonLink";