import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import useResizeObserver from '@react-hook/resize-observer';

import { Battlefield } from './grid/battlefield';
import { Footer } from './footer/footer';
import { Splashscreen } from './splashscreen/splashscreen';
import { GameCanvas } from './canvas/game-canvas';
import { CustomCursor } from './custom-cursor';
import { GameUpdateInfo } from './canvas/main';
import { GameInfo } from './canvas/game-info';
import { Header } from './header/header';

type Size = {
  width: number,
  height: number
}

function App() {
  const [battleRunning, setBattleRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<Size>({width: 0, height: 0});
  const [gameUpdateInfo, setGameUpdateInfo] = useState<GameUpdateInfo | undefined>(undefined);

  const mainRef = useRef<HTMLDivElement>(null);

  useResizeObserver(mainRef.current, (_) => setSize({ width: _.contentRect.width, height: _.contentRect.height }));

  useEffect(() => {
    if (mainRef && mainRef.current) {
      setSize({ height: mainRef.current.clientHeight, width: mainRef.current.clientWidth });
    }
  }, [loading]);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <CustomCursor />
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      <Header gameRunning={battleRunning} loading={loading} />
      {loading &&
        <Splashscreen onStart={() => setLoading(false)} />
      }
      {!loading &&
        <div className='top-div' style={{ width: '100%', height: '100%', userSelect: 'none' }} onClick={() => { }}>
          <main ref={mainRef}>
            <div className='column middle-align center-align middle'>
              {!battleRunning &&
                <Battlefield height={size.height} width={size.width} onStart={() => setBattleRunning(true)} />
              }
              {battleRunning && 
                <GameCanvas endGameCallback={() => setBattleRunning(false)} gameUpdateCallback={(updateInfo) => setGameUpdateInfo(updateInfo)} showGame={true} />  
              }
              {battleRunning && gameUpdateInfo && 
                <GameInfo info={gameUpdateInfo}/>
              }
            </div>
          </main>
          {!battleRunning && <Footer />}
        </div>
      }
    </DndProvider>
  );
}

export default App;