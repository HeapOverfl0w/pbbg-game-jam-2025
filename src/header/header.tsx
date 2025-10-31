import React, { useEffect, useState } from 'react';
import { NewGameModal } from './new-game-confirmation';
import { EndGameModal } from './end-game-confirmation';
import { TutorialModal } from './tutorial';
import { AboutModal } from './about';

export enum ModalType {
  NEW_GAME,
  END_GAME,
  TUTORIAL,
  ABOUT
}

type HeaderProps = {
  loading: boolean;
  gameRunning: boolean;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function Header(props: HeaderProps) {
  const [activeModal, setActiveModal] = useState<ModalType | undefined>(undefined);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveModal(undefined);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header style={{ position: 'absolute', right: '0', zIndex: '1' }}>
        <nav>
          {(!props.loading && !props.gameRunning) &&
            <button className="circle transparent" title='New Game' onClick={() => setActiveModal(ModalType.NEW_GAME)}>
              <i>new_window</i>
            </button>
          }
          {(!props.loading && props.gameRunning) &&
            <button className="circle transparent" title='End Match' onClick={() => setActiveModal(ModalType.END_GAME)}>
              <i className='fill'>stop</i>
            </button>
          }
          <button className="circle transparent" title='Tutorial' onClick={() => setActiveModal(ModalType.TUTORIAL)}>
            <i>question_mark</i>
          </button>
          <button className="circle transparent" title='About' onClick={() => setActiveModal(ModalType.ABOUT)}>
            <i>info_i</i>
          </button>
        </nav>
      </header>
      {activeModal === ModalType.NEW_GAME &&
        <NewGameModal onClose={() => setActiveModal(undefined)} />
      }
      {activeModal === ModalType.END_GAME &&
        <EndGameModal onClose={() => setActiveModal(undefined)} />
      }
      {activeModal === ModalType.TUTORIAL &&
        <TutorialModal onClose={() => setActiveModal(undefined)} />
      }
      {activeModal === ModalType.ABOUT &&
        <AboutModal onClose={() => setActiveModal(undefined)} />
      }
    </>
  );
}