import React, { useEffect, useState } from 'react';
import { DATA } from '../canvas/data';

type SplashscreenProps = {
  onStart: () => void;
}

/**
 * Splashscreen UI component.
 * 
 * @returns 
 */
export function Splashscreen(props: SplashscreenProps) {
  const [status, setStatus] = useState<Record<string, any>>({ status: 'Loading...', percent: '0' });

  useEffect(() => {
    DATA.load();
    const interval = setInterval(() => { setStatus(DATA.getStatus()); }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='absolute top left' style={{ width: '100%', height: '100%' }}>
      <article className='padding absolute center middle' style={{ width: '70%', height: '70%', display: 'flex', flexDirection: 'row' }} >
        <img src='./img/castle.png' style={{height: '100%'}}/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', flex: 1, gap: '10%'}}>
          <h2 style={{color: '#b62a3c', marginTop: '10%'}}>Blood Moon: Of Angels and Demons (Temp Title)</h2>
          <h4 style={{width: '60%'}}>
            When the Blood Moon rose and refused to wane, the veil twixt Heaven and Hell was sundered. Through long forgotten portals, angels and demons alike now tread upon mortal soil; their endless war rekindled beneath crimson skies. Amidst the ruin of men, only those who endure the night may glimpse the dawn.
          </h4>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            {status.percent !== '100' &&
              <div style={{ width: '100%'}}>
                <progress value={status.percent} style={{ width: '100%'}} max='100'></progress>
                <h4>{status.status}</h4>
              </div>
            }
            {status.percent === '100' &&
              <button onClick={() => props.onStart()}>
                Start
              </button>
            }
          </div>
        </div>
        
      </article>
    </div>
  );
}