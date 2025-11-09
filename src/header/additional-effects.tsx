import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function AdditionalEffects() {
  return (
    <>
      <h4 style={{ paddingBottom: '0.5em' }}>Additional Effects:</h4>
      <h6 className="bold">Life Steal</h6>
      <p style={{ paddingBottom: '0.5em' }}>Recover 20% of damage dealt as health.</p>
      <h6 className="bold">Dodge</h6>
      <p style={{ paddingBottom: '0.5em' }}>30% chance to avoid damage.</p>
      <h6 className="bold">Defense</h6>
      <p style={{ paddingBottom: '0.5em' }}>10% increase to all resistances.</p>
      <h6 className="bold">Fast</h6>
      <p style={{ paddingBottom: '0.5em' }}>Doubles movement speed.</p>
      <h6 className="bold">Reach</h6>
      <p style={{ paddingBottom: '0.5em' }}>+2 to Range.</p>
      <h6 className="bold">Accurate</h6>
      <p style={{ paddingBottom: '0.5em' }}>+30% to Critical Chance.</p>
      <h6 className="bold">Thorns</h6>
      <p style={{ paddingBottom: '0.5em' }}>30% damage reflected back to attacker.</p>
      <h6 className="bold">Instant</h6>
      <p style={{ paddingBottom: '0.5em' }}>Damage dealt instantly instead of a projectile.</p>
      <h6 className="bold">Unwaivering</h6>
      <p style={{ paddingBottom: '0.5em' }}>Unable to be cursed.</p>
    </>
  );
}