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
      <article className='padding absolute center middle bottom-align center-align' style={{ width: '50%', height: '50%' }} >
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
      </article>
    </div>
  );
}