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

    // useEffect(()=>{
    //   const verifyUser= async()=>{
    //     try {
    //       const res= await axios.get('http://localhost:5000/api/auth/verify',{
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //       });
    //       if(res.data.success){
    //         setuser(res.data.user)
    //       }else{
    //         setuser(null)
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
      
    //   }
    //   verifyUser()
    // },[])
  return (
    <authcontext.Provider value={{user,login,logout}} >
        {children}
    </authcontext.Provider>
  )
}

export const useAuth=()=> useContext(authcontext)

export default ContextProvider