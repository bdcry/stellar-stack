import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from '../../pages/home/home';
import { Layout } from '../../pages/layout/layout';
import { Login } from '../../pages/login/login';

import type { JSX } from 'react';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
