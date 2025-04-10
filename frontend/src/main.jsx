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
        path: '/my-account',
        element: <Accountpage />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/:other',
        element: <Error />
      }
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
