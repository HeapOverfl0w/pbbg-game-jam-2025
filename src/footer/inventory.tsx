import React from 'react';

import { ItemSlot } from '../grid/item-slot';
import { useDispatch, useSelector } from 'react-redux';
import { ActorData, StoreData } from '../redux/actor-data';
import { moveActor } from '../redux/store-slice';
import { useDrop } from 'react-dnd';
import { Item } from '../grid/item';
/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Inventory() {
  const inventory = useSelector((state: StoreData) => state.inventory);
  const dispatch = useDispatch();

  const handleDrop = (actor: ActorData) => {
    dispatch(moveActor({ x: -1, y: -1, id: actor.id } as any));
  }

  /**
   * Drag/Drop hook to enable dropping items into the item slot.
   */
  const [{isOver, canDrop}, ref] = useDrop(
    () => ({
      accept: "item",
      canDrop: () => true,
      drop: (actor: ActorData) => handleDrop(actor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    []
  );

  return (
    <div style={{ flex: 'auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div className='row horizontal' style={{marginBottom: '20px'}}>
        <h3>Reinforcements</h3>
      </div>
      <div ref={ref as any} style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '1em' }}>
        <div className='row horizontal wrap'>
          {
            inventory.map((actor, i) => {
              return <Item item={actor}/>
            })
          }
        </div>
        {isOver && !canDrop &&
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', background: 'rgba(116, 34, 34, 0.35)' }} />
        }
        {isOver && canDrop &&
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', background: 'rgba(55, 131, 55, 0.35)' }} />
        }
      </div>
    </div>
  );
}