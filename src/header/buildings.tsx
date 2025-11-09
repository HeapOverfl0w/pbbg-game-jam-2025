import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function Buildings() {
  return (
    <>
      <h4 style={{paddingBottom:'0.5em'}}>Buildings:</h4>
      <h6 className="bold">Swordsmith</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases pierce damage of all units.</p>
      <h6 className="bold">Lumber Mill</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases blunt damage of all units.</p>
      <h6 className="bold">Mystic Hut</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases magic damage of all units.</p>
      <h6 className="bold">Armorsmith</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases pierce resist of all units.</p>
      <h6 className="bold">Mason</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases blunt resist of all units.</p>
      <h6 className="bold">Cathedral</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases magic resist of all units.</p>
      <h6 className="bold">Barracks</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases maximum reinforcements on loss.</p>
      <h6 className="bold">Training Grounds</h6>
      <p style={{ paddingBottom: '0.5em' }}>Increases critical chance of all units.</p>
    </>
  );
}