import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@components/app/app';

import storeSetup from './services/store';

import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={storeSetup}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
