import React, { useState } from 'react';
import { GameGoal } from './game-goal';
import { Sides } from './sides';
import { AngelUnits } from './angel-units';
import { DemonUnits } from './demon-units';
import { HowToPlay } from './how-to-play';
import { Buildings } from './buildings';
import { UnitColors } from './unit-colors';
import { UnitRarity } from './unit-rarity';
import { UnitActions } from './unit-actions';
import { ActionTargeting } from './action-targeting';
import { AdditionalEffects } from './additional-effects';

type TutorialModalProps = {
  onClose: () => void;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function TutorialModal(props: TutorialModalProps) {
  const [page, setPage] = useState(0);

  const getPage = () => {
    switch (page) {
      case 1:
        return <Sides />;
      case 2:
        return <HowToPlay />;
      case 3:
        return <Buildings />;
      case 4:
        return <UnitColors />;
      case 5:
        return <UnitRarity />;
      case 6:
        return <UnitActions />;
      case 7:
        return <ActionTargeting />;
      case 8:
        return <AdditionalEffects />;
      case 9:
        return <AngelUnits />;
      case 10:
        return <DemonUnits />;
      default:
        return <GameGoal />;

    }
  }

  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur" onClick={() => props.onClose()}>
      <dialog className="active absolute center middle" onClick={(e) => { e.stopPropagation() }}>
        <div className="center-align padding">
          <h3>Tutorial</h3>
        </div>
        <>
          {
            getPage()
          }
        </>
        <nav className="center-align">
          <button className="circle transparent" style={{ visibility: page === 0 ? 'hidden' : 'visible' }} title='Back' onClick={() => setPage(Math.max(0, page - 1))}>
            <i>arrow_left_alt</i>
          </button>
          <button className="circle transparent" title='Close' onClick={() => props.onClose()}>
            <i>close</i>
          </button>
          <button className="circle transparent" style={{ visibility: page === 10 ? 'hidden' : 'visible' }} title='Next' onClick={() => setPage(Math.min(page + 1))}>
            <i>arrow_right_alt</i>
          </button>
        </nav>
      </dialog>
    </div>
  );
}