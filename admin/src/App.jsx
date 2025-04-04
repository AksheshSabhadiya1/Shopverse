import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './pages/Header/Header'
import SliderContextProvider from './context/SliderContextProvider'

function App() {

  return (
    <SliderContextProvider>
    <Header />
    <Outlet />
    </SliderContextProvider>
  )
}

export default App
