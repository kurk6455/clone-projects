import { Route, Routes } from 'react-router-dom'
import './App.css'
import Start from './pages/start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import { UserProtectWrapper } from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/users/register" element={<UserSignup />} />
      <Route path="/users/login" element={<UserLogin />} />
      <Route path="/captains/register" element={<CaptainSignup />} />
      <Route path="/captains/login" element={<CaptainLogin/>} />
      <Route path="/home" element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
      <Route path="/users/logout" element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
    </Routes>
  )
}

export default App;
