import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
<<<<<<< HEAD
=======

>>>>>>> 4e614c98aa440228e04720cf25a38c481fb58d32
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <BrowserRouter >
      <Routes>
        {/* <h1 className='text-5xl text-semibold'>Note App</h1> */}
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
 
