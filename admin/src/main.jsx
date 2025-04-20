import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup.jsx'
import AllProduct from './pages/Products/AllProduct.jsx'
import AllUser from './pages/Users/AllUser.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Error from './Error/Error.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import AddEditProduct from './pages/Products/AddEditProduct.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AllOrders from './pages/Orders/AllOrders.jsx'
import OrderTrackingPage from './pages/Orders/OrderTrackingPage.jsx'

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'products',
        element: <AllProduct />
      },
      {
        path: 'products/addproduct',
        element: <AddEditProduct />
      },
      {
        path: 'products/editproduct/:id',
        element: <AddEditProduct />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'users',
        element: <AllUser />
      },
      {
        path: 'users/approveduser',
        element: <AllUser />
      },
      {
        path: 'users/notapproveduser',
        element: <AllUser />
      },
      {
        path: 'orders',
        element: <AllOrders />,
        children: [
          { path: 'pending', element: <AllOrders /> },
          { path: 'processing', element: <AllOrders /> },
          { path: 'shipped', element: <AllOrders /> },
          { path: 'delivered', element: <AllOrders /> },
          { path: 'returns', element: <AllOrders /> },
        ]
      },
      {
        path: 'orders/:orderid',
        element: <OrderTrackingPage />
      },
      {
        path: '*',
        element: <Error />
      }
      
    ]
  }
])

const queryclient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryclient} >
  <RouterProvider router={router}>
      <App />
  </RouterProvider>
  </QueryClientProvider>
)
