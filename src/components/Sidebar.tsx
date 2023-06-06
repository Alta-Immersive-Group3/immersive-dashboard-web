import { FC } from 'react';
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import ALTA from '../../public/logo-ALTA-v2@2x 1.png';
import { NavLink } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

const Sidebar: FC<Props> = ({ children }) => {
  return (
    <div className="drawer sm:drawer-open ">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay"
        ></label>
        <div className="w-72 h-full bg-base-100 text-secondary-content p-3">
          <div className="w-full h-full rounded-2xl flex flex-col justify-between items-center bg-secondary p-5">
            <div className="w-full flex flex-col items-center pt-3">
              <img
                src={ALTA}
                alt="logo-alta"
                className="max-w-[55%]"
              />
              <div className="divider my-2 w-full"></div>

              <ul className="menu p-0 gap-1 text-base-200 text-center text-lg">
                <li>
                  <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                      isActive ? 'font-medium text-base-100' : ''
                    }
                  >
                    <FaHome /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/userlist'}
                    className={({ isActive }) =>
                      isActive ? 'font-medium text-base-100' : ''
                    }
                  >
                    <FaUserTie /> Users
                  </NavLink>
                </li>
                <li>
                  <a>
                    <FaUser />
                    Mentee
                  </a>
                </li>
                <li>
                  <a>
                    <FaUsers />
                    Class
                  </a>
                </li>
              </ul>
            </div>
            <ul className="menu p-0 gap-1 text-base-200 text-center text-lg">
              <li>
                <NavLink
                  to={'/profile'}
                  className={({ isActive }) =>
                    isActive ? 'font-medium text-base-100' : ''
                  }
                >
                  <FaUserCircle />
                  Profile
                </NavLink>
              </li>
              <li>
                <a>
                  <FaSignOutAlt />
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* <label
  htmlFor="my-drawer-2"
  className="btn btn-primary drawer-button sm:hidden"
>
  opem
</label>; */
}
