import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Homepage from '../pages';
import Userlist from '../pages/Userlist';
import Classlist from '../pages/Classlist';
import Menteelist from '../pages/Menteelist';
import MenteeLog from '../pages/MenteeLog';
import MenteeEdit from '../pages/MenteeEdit';
import MenteeAdd from '../pages/MenteeAdd';

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
          path="/users"
          element={<Userlist />}
        />
        <Route
          path="/classes"
          element={<Classlist />}
        />
        <Route
          path="/mentee"
          element={<Menteelist />}
        />
        <Route
          path="/mentee/add"
          element={<MenteeAdd />}
        />
        <Route
          path="/mentee/:mentee_id/edit"
          element={<MenteeEdit />}
        />
        <Route
          path="/mentee/:mentee_id/log"
          element={<MenteeLog />}
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
