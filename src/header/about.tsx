import React from 'react';

type AboutModalProps = {
  onClose: () => void;
}

/**
 * Footer UI component.
 * 
 * @returns 
 */
export function AboutModal(props: AboutModalProps) {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur" onClick={() => props.onClose()}>
      <dialog className="active absolute center middle" onClick={(e) => { e.stopPropagation() }}>
        <div className="center-align padding">
          <h5>About</h5>
        </div>
        <p className='padding'>Blood Moon: Of Angels and Demons is an army auto-battler with roguelite elements.</p>
        <p className='padding'>It was made by two developers for the r/PBBG 2025 gamejam.</p>
        <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src='./img/logo.png' />
        <p className="center-align padding">Check out our other games <a href='https://fortron.itch.io/' style={{color: '#b62a3c'}}>here</a>!</p>
        <p className="center-align padding">And <a href='https://idlehack.net' style={{color: '#b62a3c'}}>Play IdleHack!</a></p>
        <nav className="center-align">
          <button className="circle transparent" title='' onClick={() => props.onClose()}>
            <i>close</i>
          </button>
        </nav>
      </dialog>
    </div>
  );
}