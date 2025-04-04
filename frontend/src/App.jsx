import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Breadcrumb from './components/Breadcrumbs/Breadcrumb'
import FilterContextProvider from './context/FilterContextProvider'

function App() {

  return (
    <FilterContextProvider >
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </FilterContextProvider>
  )
}

export default App
