import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
    <div className="navBar">
      <NavLink className={({ isActive }) =>
              isActive ? "text-white" : ""
            } to="/Home">Home</NavLink>
      <NavLink className={({ isActive }) =>
              isActive ? "text-white" : ""
            } to="/">Profile</NavLink>
      </div>
  
      </div>
  )
}
