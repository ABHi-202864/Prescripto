import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);

  return (
    <div>
      {
        aToken && <ul>
          <NavLink>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar;
