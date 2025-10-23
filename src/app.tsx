import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Battlefield } from './grid/battlefield';
import { Footer } from './footer/footer';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      <main className='responsive'>
        <div className='row absolute center middle' style={{ userSelect: 'none' }}>
          <Battlefield editable={true} />
          <Battlefield editable={false} />
        </div>
      </main>
      <Footer/>
    </DndProvider>
  );
}

export default App;