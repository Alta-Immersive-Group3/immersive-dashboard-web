import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import Profile from '../pages/Profile';
import Homepage from '../pages';
import Userlist from '../pages/Userlist';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/Login"
          element={<Login />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/userlist"
          element={<Userlist />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
