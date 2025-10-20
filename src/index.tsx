import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElem = document.getElementById('root');
if (rootElem) {
    const root = createRoot(rootElem);

    root.render(
        <Provider store={store}>
            <App />
        </Provider>
      );
}