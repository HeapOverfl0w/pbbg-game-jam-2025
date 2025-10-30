import React, { useEffect, useState } from 'react';
import { Loading } from './loading';
import { NewGame } from './new-game';

type SplashscreenProps = {
  onStart: () => void;
}

/**
 * Splashscreen UI component.
 * 
 * @returns 
 */
export function Splashscreen(props: SplashscreenProps) {
  const [loading, setLoading] = useState(true);

  const handleStart = () => {
    // TODO - temp check for starting new game
    if (loading) {
      setLoading(false);
    } else {
      props.onStart();
    }
  };

  return (
    <div className='absolute top left' style={{ width: '100%', height: '100%' }}>
      <article className='padding absolute center middle' style={{ width: '70%', height: '70%', display: 'flex', flexDirection: 'row' }} >
        {loading && <Loading onStart={() => handleStart()} />}
        {!loading && <NewGame onStart={() => handleStart()}/>}
      </article>
    </div>
  );
}