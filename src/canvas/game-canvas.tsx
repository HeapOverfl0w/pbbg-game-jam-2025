import React, { useRef, useMemo, useEffect } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, createTestTeamData } from "./constants";
import { EndGameResult, GameUpdateInfo, Main } from './main';
import { useSelector } from 'react-redux';
import { StoreData } from '../redux/actor-data';

export type GameCanvasProps = {
    endGameCallback: (result: EndGameResult) => void;
    gameUpdateCallback: (info: GameUpdateInfo) => void;
    showGame: boolean;
}

export function GameCanvas(props: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const playerTeamData = useSelector((state: StoreData) => state.playerTeam);
    const enemyTeamData = useSelector((state: StoreData) => state.npcTeam);
    const gameApp = useRef<Main>(null);

    useEffect(() => {
        if (canvasRef.current && !gameApp.current) {
            gameApp.current = new Main(canvasRef.current, endGameCallback, props.gameUpdateCallback);
            startGame();
        }
    }, [canvasRef.current]);

    const endGameCallback = (result: EndGameResult) => {
        props.endGameCallback(result);
    }

    /* useEffect(() => {
        startGame();
    }, [props.showGame]); */

    const startGame = () => {
        if (props.showGame && gameApp.current) {
            gameApp.current.start(playerTeamData, enemyTeamData);
        }
    }

    return (
        <div style={{width: '75vw', border: 'white 2px solid'}}>
            <canvas style={{width: '100%', height: '100%'}}
                    id='scene' ref={canvasRef}
                    width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
            ></canvas>
        </div>
    );
}