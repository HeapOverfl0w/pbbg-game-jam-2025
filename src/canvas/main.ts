import { Application } from "pixi.js";
import { TeamData } from "../redux/actor-data";
import { GameMap } from "./game-map";
import { MAX_ROUND_TIME_MS, TICK_RATE } from "./constants";

export type EndGameResult = 'PLAYER_DEFEAT' | 'ENEMY_DEFEAT' | 'TIE';

export class Main {
    private gameMap: GameMap | undefined;
    private webglApplication: Application;
    private startTime: number = 0;
    private lastEndGameStateCheck: number = 0;
    private endGameCallback: (result: EndGameResult) => void;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, endGameCallback: (result: EndGameResult) => void) {
        this.canvas = canvas;
        const webglApplication = new Application();      

        this.webglApplication = webglApplication;
        this.endGameCallback = endGameCallback;
    }

    async start(playerTeam: TeamData, enemyTeam: TeamData) {
        await this.webglApplication.init({
            canvas: this.canvas,
            antialias: false,
            width: this.canvas.width,
            height: this.canvas.height,
            backgroundColor: 0x3f5592, // Default background color
            resolution: window.devicePixelRatio,
        });
        this.webglApplication.ticker.maxFPS = TICK_RATE;
        this.webglApplication.ticker.add(this.update.bind(this));

        this.gameMap = new GameMap(this.webglApplication.stage, playerTeam, enemyTeam);
        this.webglApplication.start();
        this.startTime = performance.now();
        this.lastEndGameStateCheck = performance.now();
    }

    update() {
        this.gameMap?.update();

        if (performance.now() - this.lastEndGameStateCheck >= 1000) {
            this.lastEndGameStateCheck = performance.now();
            this.checkEndGameState();
        }
        
    }

    private checkEndGameState() {
        if (this.gameMap?.isPlayerTeamDefeated()) {
            // End the round with player team defeat.
            this.endGameCallback('PLAYER_DEFEAT');
        } else if (this.gameMap?.isEnemyTeamDefeated()) {
            // End the round with enemy team defeat.
            this.endGameCallback('ENEMY_DEFEAT');
        } /* else if (this.startTime && performance.now() - this.startTime > MAX_ROUND_TIME_MS) {
            // End the round in tie.
            this.endGameCallback('TIE');
        } */
    }
}