import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  targetRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  open: boolean;
  margin?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ targetRef, children, open}) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const tooltipEl = tooltipRef.current;
    if (!tooltipEl) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = rect.top + window.scrollY - tooltipRect.height;
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

    let transform = "translate(0, 0)";

    // --- Flip below if going off top
    if (top < window.scrollY) {
      top = rect.bottom + window.scrollY;
      transform = "translate(0, 0)";
    }
    //if it's too long and going off screen then put it to the right
    if (top + tooltipRect.height > vh) {
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      left = rect.right;
    }
    //if it's running off the left side of the screen, put it on the right
    if (left + tooltipRect.width > vw) {
      top = rect.top + rect.height / 2 - tooltipRect.height / 2;
      left = rect.left - tooltipRect.width;
    }

    // --- Clamp horizontally
    if (left < 0) left = 4;
    if (left + tooltipRect.width > vw) left = vw - tooltipRect.width - 4;

    // --- Optional flip horizontally if target is near edge
    const centerX = rect.left + rect.width / 2;
    if (centerX < tooltipRect.width / 2) transform = "translateX(0)";
    if (centerX > vw - tooltipRect.width / 2) transform = "translateX(0)";

    setStyle({
      position: "absolute",
      top,
      left,
      zIndex: 9997,
      transform,
      opacity: 1,
    });
  }, [open, targetRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="tooltip"
      style={{
        ...style,
        boxShadow: "var(--shadow-2)",
        pointerEvents: "none",
        maxWidth: "calc(100vw - 16px)",
        wordWrap: "break-word",
      }}
    >
      {children}
    </div>,
    document.body
  );
};