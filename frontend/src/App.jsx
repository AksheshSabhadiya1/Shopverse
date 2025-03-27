import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'

function App() {

  return (
   <>
   <Header />
   <Outlet />
   <Footer />
   </>
  )
}

export default App
