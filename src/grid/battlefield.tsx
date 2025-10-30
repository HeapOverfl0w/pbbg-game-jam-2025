import React, { useEffect, useRef } from 'react';

import { ItemSlot } from './item-slot';
import { ItemSlotStatic } from './item-slot-static';
import { useSelector } from 'react-redux';
import { StoreData } from '../redux/actor-data';

type BattlefieldProps = {
  height: number,
  width: number,
  onStart: () => void;
}

/**
 * Battlefield UI component.
 * 
 * @returns 
 */
export function Battlefield(props: BattlefieldProps) {
  const actors = useSelector((state: StoreData) => state.playerTeam.actors);
  const round = useSelector((state: StoreData) => state.currentRound);
  const enemies = useSelector((state: StoreData) => state.npcTeam.actors);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef && bodyRef.current) {
      let hScale = props.height / bodyRef.current.offsetHeight;
      let wScale = props.width / bodyRef.current.offsetWidth;

      bodyRef.current.style.scale = Math.min(hScale, wScale).toString();
    }
  },[bodyRef, props.height, props.width])

  return (
    <div ref={bodyRef} className='row vertical'>
      <h3 style={{alignSelf: 'center'}}>Round {round}</h3>
      <div className='row horizontal'>
        <div className='row no-space horizontal'>
          {
            actors.map((_, i) => {
              return <div className='row no-space vertical'>
                {
                  _.map((__, j) => <ItemSlot data={__} x={i} y={j} />)
                }
              </div>
            })
          }
        </div>
        <h3 style={{color: '#b62a3c'}}>VS</h3>
        <div className='row no-space horizontal'>
          {
            enemies.map((_, i) => {
              return <div className='row no-space vertical'>
                {
                  _.map((__, j) => <ItemSlotStatic data={__} />)
                }
              </div>
            })
          }
        </div>
      </div>
      <div style={{alignSelf: 'center'}}>
        <button disabled={false/* actors.flatMap((_) => _.every(__ => __ === undefined)).every(_ => _ === true) */} onClick={() => props.onStart()}>
          Start
        </button>
      </div>
    </div>
  );
}