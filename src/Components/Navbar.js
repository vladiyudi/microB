import React from 'react'
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
    <div className="navBar">
      <Link to="/">Home</Link>
      <Link to="/Profile">Profile</Link>
      
      </div>
      <Outlet />
      </div>
  )
}
