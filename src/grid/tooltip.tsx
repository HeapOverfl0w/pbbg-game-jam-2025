import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  targetRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  open: boolean;
  margin?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ targetRef, children, open, margin = 0 }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const tooltipEl = tooltipRef.current;
    if (!tooltipEl) return;

    const tooltipRect = tooltipEl.getBoundingClientRect();
    const vw = window.innerWidth;

    let top = rect.top + window.scrollY - tooltipRect.height - margin;
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

    let transform = "translate(0, 0)";

    // --- Flip below if going off top
    if (top < window.scrollY + 0) {
      top = rect.bottom + window.scrollY + margin;
      transform = "translate(0, 0)";
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