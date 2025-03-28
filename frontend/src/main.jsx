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
        path: '/:other',
        element: <Error />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
