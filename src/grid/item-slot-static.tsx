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
    <div className='no-padding border'>
      <img className='responsive tiny' style={{ aspectRatio: '1/1' }} src={''} alt='' />
    </div>
  );
}