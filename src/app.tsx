import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Battlefield } from './grid/battlefield';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      <div className='row'>
        <Battlefield editable={true} />
        <Battlefield editable={false} />
      </div>
      <div/>
    </DndProvider>
  );
}

export default App;