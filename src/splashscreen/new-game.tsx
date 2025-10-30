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
export function NewGame(props: SplashscreenProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', textAlign: 'center', padding: '1em', width: '100%' }}>
      <h3 style={{ color: '#b62a3c' }}>Choose A Side</h3>
      <div className='grid medium-space' style={{width: '100%', height: '100%'}}>
        <div className='s6'>
          <button style={{width: '100%', height: '100%', padding: '0', display: 'flex'}} onClick={() => props.onStart()}>
            <article style={{width: '90%', height: '90%', alignSelf: 'center'}}>
              <img src='./img/angels.png' style={{width: '100%', height: '100%', display: 'block', alignSelf: 'center'}}/>   
            </article>     
          </button>
        </div>
        <div className='s6'>
          <button style={{width: '100%', height: '100%', padding: '0'}} onClick={() => props.onStart()}>
            <article style={{width: '90%', height: '90%', alignSelf: 'center'}}>
              <img src='./img/demons.png' style={{width: '100%', height: '100%', display: 'block', alignSelf: 'center'}}/>   
            </article>  
          </button>
        </div>
      </div>
    </div>
  );
}