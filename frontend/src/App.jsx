import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Breadcrumb from './components/Breadcrumbs/Breadcrumb'
import UserDataContextProvider from './context/UserData/UserDataContextProvider'
import FilterContextProvider from './context/FilterDropDown/FilterContextProvider'

function App() {

  return (
    <UserDataContextProvider >
    <FilterContextProvider >
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </FilterContextProvider>
    </UserDataContextProvider>
  )
}

export default App
