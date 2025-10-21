import { Application } from "pixi.js";
import { TeamData } from "../redux/actor-data";
import { GameMap } from "./game-map";
import { MAX_ROUND_TIME_MS } from "./constants";

export class Main {
    private gameMap: GameMap | undefined;
    private webglApplication: Application;
    private startTime: number = 0;
    private lastEndGameStateCheck: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        const webglApplication = new Application();
        webglApplication.ticker.maxFPS = 30;
        webglApplication.ticker.add(this.update.bind(this));
        webglApplication.init({
            canvas: canvas,
            antialias: false,
            width: canvas.width,
            height: canvas.height,
            backgroundColor: 0x3f5592, // Default background color
            resolution: window.devicePixelRatio,
        });
        this.webglApplication = webglApplication;
    }

    start(playerTeam: TeamData, enemyTeam: TeamData) {
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
        } else if (this.gameMap?.isEnemyTeamDefeated()) {
            // End the round with enemy team defeat.
        } else if (this.startTime && performance.now() - this.startTime > MAX_ROUND_TIME_MS) {
            // End the round in tie.
        } 
    }
}