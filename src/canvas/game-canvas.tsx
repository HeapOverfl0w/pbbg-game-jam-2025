import React, { useRef, useMemo } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { Main } from './main';





export function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameApp = useRef<Main>(null);

    useMemo(() => {
        if (canvasRef.current && !gameApp.current) {
            gameApp.current = new Main(canvasRef.current);
        }
    }, [canvasRef.current])

    return (
        <div>
            <canvas style={{width: '100%', height: '100%'}}
                    id='scene' ref={canvasRef}
                    width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
            ></canvas>
        </div>
    );
}