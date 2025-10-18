import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from '../context/UserContextProvider.jsx'
import CaptainContextProvider from './pages/CaptainContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <CaptainContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CaptainContextProvider>
  </UserContextProvider>
)
