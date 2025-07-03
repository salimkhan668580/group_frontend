
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
  import { ToastContainer } from 'react-toastify';

function App() {


  return (

<>
<BrowserRouter>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup  />} />

  </Routes>
<ToastContainer/>
</BrowserRouter>
</>
  
  )
}

export default App
