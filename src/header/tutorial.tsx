import React from 'react';

type TutorialModalProps = {
  onClose: () => void;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function TutorialModal(props: TutorialModalProps) {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur" onClick={() => props.onClose()}>
      <dialog className="active absolute center middle" onClick={(e) => { e.stopPropagation() }}>
        <div className="center-align padding">
          <h5>How To Play</h5>
        </div>
        <p className='padding'>Some text here</p>
        <nav className="center-align">
          <button className="circle transparent" title='' onClick={() => props.onClose()}>
            <i>close</i>
          </button>
        </nav>
      </dialog>
    </div>
  );
}