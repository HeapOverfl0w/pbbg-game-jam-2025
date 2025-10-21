import React from 'react';

/**
 * Base UI component for the Inventory Item.
 * 
 * @param {*} props 
 * @returns 
 */
export function ItemSlotStatic(props: any) {
  return (
    <div className='no-padding border'>
      <img className='responsive small' style={{ aspectRatio: '1/1' }} src={''} alt='' />
    </div>
  );
}