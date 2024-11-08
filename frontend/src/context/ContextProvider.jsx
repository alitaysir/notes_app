import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const authcontext=createContext();

const ContextProvider = ({children}) => {
    const [user, setuser] = useState(null)
    const login=(user)=>{
        setuser(user)
    }

    const logout=()=>{
      localStorage.removeItem('token')
      setuser(null)
    }


  return (
    <authcontext.Provider value={{user,login,logout}} >
        {children}
    </authcontext.Provider>
  )
}

export const useAuth=()=> useContext(authcontext)

export default ContextProvider
