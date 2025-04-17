import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Breadcrumb from './components/Breadcrumbs/Breadcrumb'
import UserDataContextProvider from './context/UserData/UserDataContextProvider'
import FilterContextProvider from './context/FilterDropDown/FilterContextProvider'
import { CartContextProvider } from './context/Cart/CartContextProvider'
import { useEffect } from 'react'

function App() {

  return (
    <UserDataContextProvider>
      <CartContextProvider>
        <FilterContextProvider>
          <Header />
          <Breadcrumb />
          <Outlet />
          <Footer />
        </FilterContextProvider>
      </CartContextProvider>
    </UserDataContextProvider>
  )
}

export default App;
