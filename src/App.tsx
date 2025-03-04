import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import ribbon from './wpsjs/ribbon'
import router from './routes'

function App() {
  useEffect(() => {
    window.ribbon = ribbon;
  }, [])

  return <RouterProvider router={router} />;
}

export default App
