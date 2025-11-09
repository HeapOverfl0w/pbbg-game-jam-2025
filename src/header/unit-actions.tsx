import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function UnitActions() {
  return (
    <>
      <h4 style={{paddingBottom:'0.5em'}}>Unit Actions:</h4>
      <h6 className="bold">Attack</h6>
      <p style={{paddingBottom:'0.5em'}}>Deal Damage to Enemies.</p>
      <h6 className="bold">Buff</h6>
      <p style={{paddingBottom:'0.5em'}}>Increase Resist, Damage, Action Speed, or Crit Rate of Allies on the Battlefield.</p>
      <h6 className="bold">Heal</h6>
      <p style={{paddingBottom:'0.5em'}}>Restore Health to Allies on the Battlefield.</p>
      <h6 className="bold">Curse</h6>
      <p style={{paddingBottom:'0.5em'}}>Decrease Resist, Damage, Action Speed, or Crit Rate of Enemies on the Battlefield.</p>
    </>
  );
}