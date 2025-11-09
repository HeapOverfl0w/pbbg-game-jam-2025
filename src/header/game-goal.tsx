import React from 'react';

/**
 * Game Goal Tutorial UI component.
 * 
 * @returns 
 */
export function GameGoal() {
  return (
    <>
      <h4>Goal Of The Game:</h4>
      <p className='padding'>To reach the highest round you can by eliminating all of the enemies forces each round.</p>
      <p className='padding'>After each victorious round, you get to select 2 additional units and receive gold.</p>
      <p className='padding'>A tie will occur when both sides still have atleast 1 unit when the round timer runs out. In the event of a tie, you will be able to reconfigure your forces and retry the round.</p>
      <p className='padding'>Failing a round, by losing all of your units on the battlefield, will reset you back to round 1 with some of your reinforcements that were not included in the battle.</p>
    </>
  );
}