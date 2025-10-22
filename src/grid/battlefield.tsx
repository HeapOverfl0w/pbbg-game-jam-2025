import React from 'react';
import { useDrop } from 'react-dnd'

import { ItemSlot } from './item-slot';
import { ItemSlotStatic } from './item-slot-static';
import { useSelector } from 'react-redux';
import { TeamData } from '../redux/actor-data';

type BattlefieldProps = {
  editable: boolean;
}

/**
 * Base UI component for the Battlefield.
 * 
 * @returns 
 */
export function Battlefield(props: BattlefieldProps) {
  //const { data, error, isLoading } = useGetInventoryQuery();
  const actors = useSelector((state: TeamData) => state.actors);

  return (
    <div className='row no-space vertical'>
      {
        actors.map((_, i) => {
          return <div className='row no-space horizontal'>
            {
              _.map((__, j) => props.editable ?
                <ItemSlot data={__} x={i} y={j}/> :
                <ItemSlotStatic data={__} />
              )
            }
          </div>
        })
      }
    </div>
  );
}