import { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const NavBar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' onClick={() => navigate("/")} src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-10 font-medium'>
        <NavLink to="/">
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/doctors">
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/about">
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/contact">
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData
            ?
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p className='hover:text-black cursor-pointer' onClick={() => navigate("/myProfile")}>My Profile</p>
                  <hr />
                  <p className='hover:text-black cursor-pointer' onClick={() => navigate("/myAppointments")}>My Appointments</p>
                  <hr />
                  <p onClick={() => window.open("/admin", "_blank", "noopener,noreferrer")} className='hover:text-black cursor-pointer'>Admin Panel</p>
                  <hr />
                  <p className='hover:text-black cursor-pointer' onClick={logout}>Logout</p>
                </div>
              </div>
            </div>
            : <button className='bg-primary text-white px-8 py-3 rounded-full font-light md:block' onClick={() => navigate("/login")}>Create account</button>
        }


        <img className='w-6 md:hidden' onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" />
        {/* MOBILE MENU */}
        <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' onClick={() => navigate("/")} src={assets.logo} alt="" />
            <img className='w-7 ' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col gap-2 text-lg font-medium text-gray-700'>
            <NavLink className="px-5 py-0.5 inline-block" onClick={() => setShowMenu(false)} to="/" ><p className='border rounded px-5'>HOME</p></NavLink>
            <NavLink className="px-5 py-0.5 inline-block" onClick={() => setShowMenu(false)} to="/doctors"><p className='border rounded px-5'>ALL DOCTORS</p></NavLink>
            <NavLink className="px-5 py-0.5 inline-block" onClick={() => setShowMenu(false)} to="/about"><p className='border rounded px-5'>ABOUT</p></NavLink>
            <NavLink className="px-5 py-0.5 inline-block" onClick={() => setShowMenu(false)} to="/contact"><p className='border rounded px-5'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
