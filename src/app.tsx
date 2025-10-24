import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Battlefield } from './grid/battlefield';
import { Footer } from './footer/footer';
import { Splashscreen } from './splashscreen/splashscreen';
import { GameCanvas } from './canvas/game-canvas';

function App() {
  const [battleRunning, setBattleRunning] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <DndProvider backend={HTML5Backend}>
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      {loading &&
        <Splashscreen onStart={() => setLoading(false)} />
      }
      {!loading &&
        <div style={{ width: '100%', height: '100%' }}>
          <main className='responsive'>
            <div className='row absolute center middle' style={{ userSelect: 'none' }}>
              {!battleRunning &&
                <Battlefield onStart={() => setBattleRunning(true)} />
              }
            </div>
            {battleRunning &&
              <GameCanvas endGameCallback={() => setBattleRunning(false)} showGame={true} />
            }
          </main>
          <Footer />
        </div>
      }
    </DndProvider>
  );
}

export default App;