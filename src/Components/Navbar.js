import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

export default function Navbar() {

  const [warning, setWarning] = useState(false)
  const updateWarning =(bool)=>{
    setWarning(bool)
  }

  const handleHomeButton=()=>{
    !auth.currentUser && 
     updateWarning(true)
    setTimeout(()=>{
      updateWarning(false)
    }, 3000) 
  }

  const auth = getAuth();

  return (
    <div>
    <div className="navBar d-flex justify-content-between">
      <div>
      <NavLink onClick={handleHomeButton} className={({ isActive }) =>
              isActive ? "text-white ms-4" : "ms-4"
            } to="/Home" id="nav">Home</NavLink>
      <NavLink id="nav" className={({ isActive }) =>
              isActive ? "text-white ms-5" : "ms-5"
            } to="/">Profile</NavLink>
             <span className={warning ? "ms-4 text-warning":"d-none"}>You must be logged in</span>
             </div>
             <div className='d-flex align-items-center me-3'>
             <p className="me-3 mt-3">{auth.currentUser?auth.currentUser.displayName:"User"}</p>
             <Avatar className="me-4 mb-1 border mt-1"
                  alt="Remy Sharp"
                  src={auth.currentUser?auth.currentUser.photoURL:""}
                  sx={{ width: 35, height: 35 }}
                />
                </div>
      </div>
      </div>
  )
}
