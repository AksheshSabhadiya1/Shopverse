import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import Breadcrumb from './components/Breadcrumbs/Breadcrumb'
import { UserDataContextProvider } from './context/UserData/UserDataContextProvider'
import { WishlistContextProvider } from './context/Wishlist/WishlistContextProvider'
import { CartContextProvider } from './context/Cart/CartContextProvider'
import { FilterContextProvider } from './context/FilterDropDown/FilterContextProvider'


function App() {

  return (
    <UserDataContextProvider>
      <WishlistContextProvider>
      <CartContextProvider>
        <FilterContextProvider>
          <Header />
          <Breadcrumb />
          <Outlet />
          <Footer />
        </FilterContextProvider>
      </CartContextProvider>
      </WishlistContextProvider>
    </UserDataContextProvider>
  )
}

export default App;
