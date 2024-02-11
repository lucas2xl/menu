"use client";
import { useInView } from "framer-motion";
import { cloneElement, useRef } from "react";

type Props = {
  isInviewState: {
    trueState: string;
    falseState: string;
  };
  children: React.ReactElement;
  className?: string;
};

export function LayoutEffect({
  children,
  className,
  isInviewState: { trueState = "", falseState = "" },
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return cloneElement(children, {
    ref,
    className: `${children.props.className || ""} ${className || ""} ${
      isInView ? trueState : falseState
    }`,
  });
}
