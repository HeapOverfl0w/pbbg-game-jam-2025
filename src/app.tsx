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
import { EndGameResult, GameUpdateInfo } from './canvas/main';
import { GameInfo } from './canvas/game-info';
import { Header } from './header/header';
import { useDispatch, useSelector } from 'react-redux';
import { lose, victory } from './redux/store-slice';
import { StoreData } from './redux/actor-data';
import { UnitSelection } from './unit-selection';

type Size = {
  width: number,
  height: number
}

function App() {
  const [battleRunning, setBattleRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [gameUpdateInfo, setGameUpdateInfo] = useState<GameUpdateInfo | undefined>(undefined);
  const [endGameResult, setEndGameResult] = useState<EndGameResult | undefined>(undefined);
  const maxReinforcements = useSelector((state: StoreData) => state.maxReinforcements);
  const currentRound = useSelector((state: StoreData) => state.currentRound);
  const dispatch = useDispatch();

  const mainRef = useRef<HTMLDivElement>(null);

  useResizeObserver(mainRef.current, (_) => setSize({ width: _.contentRect.width, height: _.contentRect.height }));

  useEffect(() => {
    if (mainRef && mainRef.current) {
      setSize({ height: mainRef.current.clientHeight, width: mainRef.current.clientWidth });
    }
  }, [loading]);

  function endGame(result: EndGameResult) {
    if (result == "PLAYER_DEFEAT") {
      dispatch(lose());
    }

    setEndGameResult(result);
    setBattleRunning(false);
  }

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <CustomCursor />
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      {!battleRunning &&
        <Header gameRunning={battleRunning} loading={loading} />
      }
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
                <GameCanvas endGameCallback={endGame} gameUpdateCallback={(updateInfo) => setGameUpdateInfo(updateInfo)} showGame={true} />
              }
              {battleRunning && gameUpdateInfo &&
                <GameInfo info={gameUpdateInfo} />
              }
            </div>
          </main>
          {!battleRunning && <Footer />}
        </div>
      }
      {endGameResult === "ENEMY_DEFEAT" &&
        <UnitSelection onNextRound={() => setEndGameResult(undefined)} />
      }
      {(endGameResult && endGameResult !== "ENEMY_DEFEAT") &&
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', userSelect: 'none' }} className="small-blur">
          <dialog className="active absolute center middle" style={{ maxWidth: '800px' }}>
            <h3 style={{ justifySelf: 'center' }}>{endGameResult === "PLAYER_DEFEAT" ? "DEFEAT!" : "TIE!"}</h3>
            <p>{endGameResult === "PLAYER_DEFEAT" ?
              "Your army has been slain, but " + maxReinforcements + " reinforcements managed to survive." :
              "The battle timer has ran out before a victor was decided. Try with a new formation to vanquish the enemy."}</p>
            <nav className="center-align">
              <button onClick={() => setEndGameResult(undefined)}>OK</button>
            </nav>
          </dialog>
        </div>
      }
    </DndProvider>
  );
}

export default App;