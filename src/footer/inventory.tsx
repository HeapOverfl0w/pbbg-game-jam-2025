import React from 'react';

import { ItemSlot } from '../grid/item-slot';
import { useSelector } from 'react-redux';
import { TeamData } from '../redux/actor-data';
/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Inventory() {
  const inventory = useSelector((state: TeamData) => state.inventory);

  return (
    <div style={{ flex: 'auto', width: '100%'}}>
      <div className='row horizontal'>
        <h3>Inventory</h3>
      </div>
      <div className='row horizontal wrap' style={{ flex: 'auto', width: '100%', overflowX: 'hidden', overflowY: 'auto' }}>
        {
          inventory.map((_, i) => {
            return <ItemSlot data={_} x={i} y={-1} />
          })
        }
      </div>
    </div>
  );
}