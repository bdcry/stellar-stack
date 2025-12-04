import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@components/app/app';

import storeSetup from './services/store';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={storeSetup}>
      <App />
    </Provider>
  </StrictMode>
);
