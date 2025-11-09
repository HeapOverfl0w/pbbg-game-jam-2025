import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function UnitRarity() {
  return (
    <>
      <h4 style={{ paddingBottom: '0.5em' }}>Unit Rarity:</h4>
      <h6 className="bold">Common</h6>
      <p style={{ paddingBottom: '0.5em' }}>The most common units available in the game with no special abilities.</p>
      <h6 className="bold">Uncommon</h6>
      <p style={{ paddingBottom: '0.5em' }}>Upgraded units. Drop rate for these units starts at 20% and progressively increases each round you complete.</p>
      <h6 className="bold">Rare</h6>
      <p style={{ paddingBottom: '0.5em' }}>The strongest units in the game. Drop rate for these units starts at 5% and progressively increases each round you complete.</p>
    </>
  );
}