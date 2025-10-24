import React, { useRef, useMemo, useEffect } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, createTestTeamData } from "./constants";
import { EndGameResult, Main } from './main';

export type GameCanvasProps = {
    endGameCallback: (result: EndGameResult) => void;
    showGame: boolean;
}

export function GameCanvas(props: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameApp = useRef<Main>(null);

    useEffect(() => {
        if (canvasRef.current && !gameApp.current) {
            gameApp.current = new Main(canvasRef.current, endGameCallback);
            startGame();
        }
    }, [canvasRef.current]);

    const endGameCallback = (result: EndGameResult) => {
        console.log("Game ended with result:", result);
        props.endGameCallback(result);
    }

    /* useEffect(() => {
        startGame();
    }, [props.showGame]); */

    const startGame = () => {
        if (props.showGame && gameApp.current) {
            gameApp.current.start(createTestTeamData(), createTestTeamData());
        }
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <canvas style={{width: '100%', height: '100%'}}
                    id='scene' ref={canvasRef}
                    width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
            ></canvas>
        </div>
    );
}