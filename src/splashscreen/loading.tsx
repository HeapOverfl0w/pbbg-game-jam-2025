import React, { useEffect, useState } from 'react';
import { DATA } from '../canvas/data';
import { useDispatch } from 'react-redux';
import { addActor, loadStoreState } from '../redux/store-slice';
import { createRandomUnit } from '../units';
import { doesStateExist, loadState, saveState, store } from '../redux/store';
import * as debounce from 'debounce';

type SplashscreenProps = {
  onStart: () => void;
}

/**
 * Splashscreen UI component.
 * 
 * @returns 
 */
export function Loading(props: SplashscreenProps) {
  const [status, setStatus] = useState<Record<string, any>>({ status: 'Loading...', percent: '0' });
  const [stateExists] = useState(doesStateExist());
  const dispatch = useDispatch();

  useEffect(() => {
    async function initialLoad() {
      await DATA.load();

      if (stateExists) {
        dispatch(loadStoreState(loadState()));
      }

      store.subscribe(
        // we use debounce to save the state once each 800ms
        // for better performances in case multiple changes occur in a short time
        debounce(() => {
          saveState(store.getState());
        }, 800)
      );
    }

    initialLoad();
    const interval = setInterval(() => { setStatus(DATA.getStatus()); }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <img src='./img/castle.png' style={{ height: '100%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', textAlign: 'center', padding: '1em' }}>
        <h3 style={{ color: '#b62a3c' }}>Blood Moon: Of Angels and Demons (Temp Title)</h3>
        <p style={{ width: '60%', fontSize: '1.75rem' }}>
          When the Blood Moon rose and refused to wane, the veil twixt Heaven and Hell was sundered. Through long forgotten portals, angels and demons alike now tread upon mortal soil; their endless war rekindled beneath crimson skies. Amidst the ruin of men, only those who endure the night may glimpse the dawn.
        </p>
        <div style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          {status.percent !== '100' &&
            <div style={{ width: '100%' }}>
              <progress value={status.percent} style={{ width: '100%' }} max='100'></progress>
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

    </>
  );
}