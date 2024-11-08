import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



const Signup = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate()

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
          const response= await axios.post("https://notes-application-backend-uy6y.onrender.com/api/auth/register"
            ,{name,email,password});
          if(response.data.success){
            navigate('/login')
          }
          //console.log(response)
        } catch (error) {
          console.log(error)
        }

        
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              onChange={(e)=>setname(e.target.value)}
              id="name"
              placeholder="Enter Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={(e)=>setemail(e.target.value)}
              id="email"
              placeholder="Enter Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              onChange={(e)=>setpassword(e.target.value)}
              id="password"
              placeholder="Enter Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Sign Up
            </button>
          </div>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
