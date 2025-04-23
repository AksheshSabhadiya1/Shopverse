import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Signin from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Home from './pages/Home/Home.jsx'
import Error from './pages/Error/Error.jsx'
import Accountpage from './pages/Accountpage/Accountpage.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Wishlist from './pages/Wishlist/Wishlist.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx'
import AllProductsPage from './components/ProductsAPI/AllProductsPage.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import EditProfile from './pages/Accountpage/EditProfile.jsx'
import AddressBook from './pages/Accountpage/AddressBook.jsx'
import Wishlistpage from './pages/Accountpage/Wishlistpage.jsx'
import Cancellations from './pages/Accountpage/Cancellations.jsx'
import MyProfile from './pages/Accountpage/MyProfile.jsx'
import Orders from './pages/Accountpage/Orders.jsx'
import PasswordChange from './pages/Accountpage/PasswordChange.jsx'
import PaymentMethods from './pages/Accountpage/PaymentMethods.jsx'
import OrderDetails from './pages/Orders/OrderDetails.jsx'
import ProductCategory from './components/ProductsAPI/ProductCategory.jsx'
<<<<<<< HEAD
import CategoryPage from './components/ProductsAPI/CategoryPage.jsx'
import AllOrderPage from './pages/Orders/AllOrderPage.jsx'
=======
>>>>>>> 0cea7e57c91d7df5ebbf4d4f8986583f1f5736d0


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/my_account',
        element: <Accountpage />,
        children: [
          { path: '', element: <MyProfile /> },
          { path: 'edit_profile', element: <EditProfile /> },
          { path: 'addressbook', element: <AddressBook /> },
          { path: 'edit_password', element: <PasswordChange /> },
          { path: 'payments', element: <PaymentMethods /> },
          { path: 'wishlist', element: <Wishlistpage />},
          { path: 'orders', element: <Orders />},
          { path: 'cancellations', element: <Cancellations />},
        ],
      },      
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/orders/:orderId',
        element: <OrderDetails />
      },
      {
        path: '/orders',
<<<<<<< HEAD
        element: <AllOrderPage />
=======
        element: <OrderDetails />
>>>>>>> 0cea7e57c91d7df5ebbf4d4f8986583f1f5736d0
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/products',
        element: <AllProductsPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetails />
      },
      {
        path: '/products/category/:category',
        element: <ProductCategory />
      },
      {
<<<<<<< HEAD
        path: '/products/allCategory/:category',
        element: <CategoryPage />
      },
      {
=======
>>>>>>> 0cea7e57c91d7df5ebbf4d4f8986583f1f5736d0
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '*',
        element: <Error />
      },
      
    ]
  }
])

const queryclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryclient} >
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
