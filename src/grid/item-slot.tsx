import React from 'react';
import { useDrop } from 'react-dnd'
import { Item } from './item';
import { useDispatch } from 'react-redux';
import { moveActor } from '../redux/store-slice';
import { ActorData } from '../redux/actor-data';

type ItemSlotProps = {
  data: ActorData|undefined;
  x: number;
  y: number;
}


/**
 * Base UI component for the Item Slot.
 * 
 * @param {*} props 
 * @returns 
 */
export function ItemSlot(props: ItemSlotProps) {
  const dispatch = useDispatch();

  /**
   * Method that handles proccessing an item when it has been dropped into the item slot.
   * 
   * @param {*} actor 
   */
  const handleDrop = (actor: ActorData) => {
    dispatch(moveActor({ x: props.x, y: props.y, id: actor.id } as any));
  }

  /**
   * Drag/Drop hook to enable dropping items into the item slot.
   */
  const [{ isOver, canDrop }, ref] = useDrop(
    () => ({
      accept: "item",
      canDrop: () => props.data === undefined,
      drop: (actor: ActorData) => handleDrop(actor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    []
  );

  return (
    <div className='padding, border' ref={ref as any}>
      <div>
        {(props.data !== undefined) &&
          <Item item={props.data} onMove={() => { }} />
        }
        {(props.data === undefined) &&
          <img className='responsive tiny' style={{ aspectRatio: '1/1' }} src={''} alt='' />
        }
        {isOver && !canDrop &&
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', background: 'rgba(255, 0, 0, 0.35)' }} />
        }
        {isOver && canDrop &&
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%', background: 'rgba(0, 255, 0, 0.35)' }} />
        }
      </div>
    </div>
  );
}