import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '../../pages/home/home';

import type { JSX } from 'react';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
