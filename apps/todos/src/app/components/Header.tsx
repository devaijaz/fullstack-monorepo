import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import { useClient } from '../hooks/useClient';
export const Header = () => {
  const { pathname } = useLocation();

  const { JWT, logout } = useClient();

  return (
    <div className="flex bg-slate-200 shadow-md py-2 text-xl justify-between items-center">
      <div className="left-section">
        <ul className="flex gap-2">
          {routes.map((nav) => (
            <li
              key={nav.id}
              className={`${pathname === nav.path ? 'underline' : ''}`}
            >
              <NavLink to={nav.path}>{nav.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-section">
        {JWT ? (
          <button className="btn secondary" onClick={(e) => logout()}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};
