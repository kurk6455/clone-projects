import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/register" element={<UserSignup />} />
      <Route path="/users/login" element={<UserLogin />} />
      <Route path="/captains/register" element={<CaptainSignup />} />
      <Route path="/captains/login" element={<CaptainLogin/>} />
    </Routes>
  )
}

export default App
