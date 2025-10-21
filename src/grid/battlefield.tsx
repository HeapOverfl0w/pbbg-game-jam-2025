import React from 'react';
import { useDrop } from 'react-dnd'

import { ItemSlot } from './item-slot';
import { ItemSlotStatic } from './item-slot-static';
/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Battlefield(props: any) {
  //const { data, error, isLoading } = useGetInventoryQuery();
  const data = [[{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}]];

  return (
    <div className='row no-space vertical'>
      {
        data.map(_ => {
          return <div className='row no-space horizontal'>
            {
              _.map(__ => props.editable ? 
                <ItemSlot data={__} /> :
                <ItemSlotStatic data={__} />
              )
            }
          </div>
        })
      }
    </div>
  );
}