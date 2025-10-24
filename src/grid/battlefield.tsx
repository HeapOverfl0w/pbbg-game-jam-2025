import React from 'react';

import { ItemSlot } from './item-slot';
import { ItemSlotStatic } from './item-slot-static';
import { useSelector } from 'react-redux';
import { StoreData } from '../redux/actor-data';

type BattlefieldProps = {
  onStart: () => void;
}

/**
 * Battlefield UI component.
 * 
 * @returns 
 */
export function Battlefield(props: BattlefieldProps) {
  const actors = useSelector((state: StoreData) => state.playerTeam.actors);
  const enemies = useSelector((state: StoreData) => state.npcTeam.actors);

  return (
    <div className='row vertical'>
      <div className='row horizontal'>
        <div className='row no-space vertical'>
          {
            actors.map((_, i) => {
              return <div className='row no-space horizontal'>
                {
                  _.map((__, j) => <ItemSlot data={__} x={i} y={j} />)
                }
              </div>
            })
          }
        </div>
        <div className='row no-space vertical'>
          {
            enemies.map((_, i) => {
              return <div className='row no-space horizontal'>
                {
                  _.map((__, j) => <ItemSlotStatic data={__} />)
                }
              </div>
            })
          }
        </div>
      </div>
      <div style={{alignSelf: 'end'}}>
        <button disabled={false/* actors.flatMap((_) => _.every(__ => __ === undefined)).every(_ => _ === true) */} onClick={() => props.onStart()}>
          Start
        </button>
      </div>
    </div>
  );
}