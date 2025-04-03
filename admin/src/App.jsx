import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './pages/Header/Header'

function App() {

  return (
    <> 
    <Header />
    <Outlet />
    </>
  )
}

export default App
