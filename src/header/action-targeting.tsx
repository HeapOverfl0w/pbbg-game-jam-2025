import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function ActionTargeting() {
  return (
    <>
      <h4 style={{ paddingBottom: '0.5em' }}>Action Targeting:</h4>
      <h6 className="bold">Single</h6>
      <p style={{paddingBottom:'0.5em'}}>Performs an Action to 1 Targeted Unit.</p>
      <h6 className="bold">AOE</h6>
      <p style={{paddingBottom:'0.5em'}}>Performs an Action on Units within a 3x3 or 5x5 grid where the Targeted Unit is in the Middle.</p>
      <h6 className="bold">Cross</h6>
      <p style={{paddingBottom:'0.5em'}}>Performs an Action on Units 1 to 2 Spaces in Front of, Behind, Above, and Below the Targeted Unit.</p>
      <h6 className="bold">Pierce</h6>
      <p style={{paddingBottom:'0.5em'}}>Performs an Action on Units 1 to 3 Spaces Behind the Targeted Unit.</p>
      <h6 className="bold">Cleave</h6>
      <p style={{paddingBottom:'0.5em'}}>Performs an Action on Units 1 to 2 Spaces Above and Below the Targeted Unit.</p>
    </>
  );
}