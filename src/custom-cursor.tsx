import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


export function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const move = (e: any) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        }  
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <img ref={cursorRef} src="./img/cursor.png" className="custom-cursor" />;
}

export type CustomDragIconProps = {
    src: string;
}
export function CustomDragIcon(props: CustomDragIconProps) {
    const cursorRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const move = (e: any) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        }  
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return createPortal(<img ref={cursorRef} src={props.src} className="custom-icon-drag" />, document.body);
}