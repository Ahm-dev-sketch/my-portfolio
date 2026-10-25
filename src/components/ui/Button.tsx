"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-all duration-200 ease-out active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-[#D47779] text-white hover:bg-[#C26567] shadow-sm shadow-[#D47779]/20 hover:shadow-md",
  secondary:
    "border border-[#F0E3DC] bg-white text-[#421623] hover:border-[#D47779] hover:bg-[#FFF9F5] shadow-2xs",
  ghost: "text-[#421623] hover:bg-[#FDF5EF] hover:text-[#D47779]",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-[0.875rem]",
  lg: "h-12 px-6 text-[0.9375rem]",
};

interface ButtonSharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsAnchor = ButtonSharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  >;

type ButtonAsButton = ButtonSharedProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const STYLE_KEYS = [
  "variant",
  "size",
  "className",
  "children",
  "href",
  "target",
  "rel",
] as const;

/** Anything with a URL scheme (http, mailto, tel) opens outside the document. */
function isExternalUrl(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  const rest: Record<string, unknown> = { ...props };
  for (const key of STYLE_KEYS) delete rest[key];


  if (props.href !== undefined) {
    const external = isExternalUrl(props.href);
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
        className={classes}
        target={props.target ?? (external ? "_blank" : undefined)}
        rel={props.rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      type={props.type ?? "button"}
      className={classes}
    >
      {props.children}
    </button>
  );
}

export default Button;
