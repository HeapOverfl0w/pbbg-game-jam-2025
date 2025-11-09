import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function UnitColors() {
  return (
    <>
      <h4 style={{paddingBottom:'0.5em'}}>Unit Colors:</h4>
      <h6 className="bold">Blue</h6>
      <p style={{paddingBottom:'0.5em'}}>Deals Extra Damage to Purple Enemies.</p>
      <h6 className="bold">Green</h6>
      <p style={{paddingBottom:'0.5em'}}>Deals Extra Damage to Blue Enemies.</p>
      <h6 className="bold">Purple</h6>
      <p style={{paddingBottom:'0.5em'}}>Deals Extra Damage to Green Enemies.</p>
    </>
  );
}