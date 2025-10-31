import React from 'react';

type EndGameModalProps = {
  onClose: () => void;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function EndGameModal(props: EndGameModalProps) {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur" onClick={() => props.onClose()}>
      <dialog className="active absolute center middle" onClick={(e) => { e.stopPropagation() }}>
        <div className="center-align padding">
          <h5>End Round</h5>
        </div>
        <div className='padding'>
          <p>Are you sure you want to end the round?</p>
          <p>Ending the round will reset you back at Round 1.</p>
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