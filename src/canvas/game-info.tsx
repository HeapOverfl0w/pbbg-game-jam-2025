
//top div for showing team health and countdown timer

import { createPortal } from "react-dom";
import { GameUpdateInfo } from "./main"

export type GameInfoProps = {
    info: GameUpdateInfo;
}

export function GameInfo({ info }: GameInfoProps ) {
    return createPortal(
        <div style={{position: 'absolute', top: '10px', left: '0', width: '100vw', display: 'flex', flexDirection: 'row', zIndex: 9997}}>
            <div style={{width: '50vw'}}>
                <div style={{width: '40vw', border: '2px', borderColor: 'white', borderStyle: 'solid', borderRadius: '0px', display: 'flex', flexDirection: 'row', height: '40px', marginLeft: '30px'}}>
                    <div style={{width: Math.round(info.playerTeamHealth / info.maxPlayerTeamHealth * 100) + '%', height: '100%', backgroundColor: '#b62a3c'}}></div>
                </div>
            </div>
            <div style={{position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%,0)'}}>
                <h2>{Math.round(100 - (performance.now() - info.startTime)/1000)}</h2>
            </div>
            <div style={{width: '50vw'}}>
                <div style={{width: '40vw', border: '2px', borderColor: 'white', borderStyle: 'solid', borderRadius: '0px', display: 'flex', flexDirection: 'row', height: '40px', marginLeft: 'auto', marginRight: '30px'}}>
                    <div style={{width: Math.round(info.enemyTeamHealth / info.maxEnemyTeamHealth * 100) + '%', height: '100%', backgroundColor: '#b62a3c'}}></div>
                </div>
            </div>
        </div>, document.body
    )

}