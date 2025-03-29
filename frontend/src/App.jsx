import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Breadcrumb from './components/Breadcrumbs/Breadcrumb'

function App() {

  return (
   <>
   <Header />
   <Breadcrumb />
   <Outlet />
   <Footer />
   </>
  )
}

export default App
