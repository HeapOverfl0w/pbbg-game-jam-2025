import React from 'react';

type NewGameModalProps = {
  onClose: () => void;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function NewGameModal(props: NewGameModalProps) {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur" onClick={() => props.onClose()}>
      <dialog className="active absolute center middle" onClick={(e) => { e.stopPropagation() }}>
        <div className="center-align padding">
          <h5>New Game</h5>
        </div>
        <div className='padding'>
          <p>Are you sure you want to start a new game?</p>
          <p>All collected units will be lost.</p>
        </div>
        <nav className="center-align">
          <button className="circle transparent" title='' onClick={() => props.onClose()}>
            <i>close</i>
          </button>
          <button className="circle transparent" title='' onClick={() => props.onClose()}>
            <i>close</i>
          </button>
        </nav>
      </dialog>
    </div>
  );
}