import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup.jsx'
import AllProduct from './pages/Products/AllProduct.jsx'
import ProductDetails from './pages/Products/EditProduct.jsx'
import AddProduct from './pages/Products/AddProduct.jsx'
import AllUser from './pages/Users/AllUser.jsx'
import ApprovedUser from './pages/Users/ApprovedUser.jsx'
import NotApprovedUser from './pages/Users/NotApprovedUser.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'

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
        element: <AddProduct />
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
        element: <ApprovedUser />
      },
      {
        path: 'users/notapproveduser',
        element: <NotApprovedUser />
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
      <App />
  </RouterProvider>
)
