import { NavLink } from 'react-router-dom';

import { classNames } from '../utils/className';
import { NAV_ITEMS } from '../constants/navigation';

function Navbar() {
  return (
    <nav className="flex justify-center w-full bg-white shadow">
      <ul className="flex space-x-6 p-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                classNames('text-sm text-gray-500', {
                  'text-blue-500': isActive
                })
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
