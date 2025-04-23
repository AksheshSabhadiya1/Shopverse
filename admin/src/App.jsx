import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './pages/Header/Header'
import { AdminDataContextProvider } from './context/AdminData/AdminDataContextProvider'
import { SliderContextProvider } from './context/SliderData/SliderContextProvider'

function App() {

  return (
    <AdminDataContextProvider>
    <SliderContextProvider>
    <Header />
    <Outlet />
    </SliderContextProvider>
    </AdminDataContextProvider>
  )
}

export default App
