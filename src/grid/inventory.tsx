import React, { ReactElement } from 'react';

import { ItemSlot } from './item-slot';
import { useSelector } from 'react-redux';
import { TeamData } from '../redux/actor-data';
/**
 * Base UI component for the Inventory.
 * 
 * @returns 
 */
export function Inventory() {
  const inventory = useSelector((state: TeamData) => state.inventory);

  const buildGrid = (): ReactElement[] => {
    let rows: ReactElement[] = [];

    for (let i = 0; i < inventory.length; i = i + 2) {
      rows.push(
        <div className='row horizontal'>
          <ItemSlot data={inventory[i]} x={i} y={-1} />
          {(i + 1) < inventory.length &&
            <ItemSlot data={inventory[i + 1]} x={i + 1} y={-1} />
          }
        </div>);
    }

    return rows;
  };

  return (
    <div className='row vertical'>
      {
        buildGrid()
      }
    </div>
  );
}