import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function Sides() {
  return (
    <>
      <h6>Choose A Side:</h6>
      <p className='padding'>You will be able to choose a side when you start a new game.</p>
      <h6>Angels</h6>
      <p className='padding'>Angel specific info here</p>
      <h6>Demons</h6>
      <p className='padding'>Demon specific info here</p>
    </>
  );
}