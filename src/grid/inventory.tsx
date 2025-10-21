import React from 'react';
import { useDrop } from 'react-dnd'

import { ItemSlot } from './item-slot';
/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Inventory() {
  //const { data, error, isLoading } = useGetInventoryQuery();
  const data = [{},{},{},{},{},{}];



  return (
    <div style={{width: '100%', alignSelf: 'start'}}>
      <button className="border square round large">
        <i>filter_list</i>
      </button>
    <div className='grid' style={{width: '100%', alignSelf: 'start'}}>
      {
        data.map(_ =>
          <div className='s12 m6 l3'>
            <ItemSlot data={_} />
          </div>)
      }
    </div>
    </div>
  );
}