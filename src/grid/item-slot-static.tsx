import React from 'react';
import { ActorData } from '../redux/actor-data';

type ItemSlotStaticProps = {
  data: ActorData|undefined;
}

/**
 * Base UI component for the Static Item Slot.
 * 
 * @param {*} props 
 * @returns 
 */
export function ItemSlotStatic(props: ItemSlotStaticProps) {
  return (
    <div className='no-padding gridcell'>
      <img className='responsive small' style={{ aspectRatio: '1/1' }} src={''} alt='' />
    </div>
  );
}