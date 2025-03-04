import { useEffect } from 'react'
import './App.css'
import ribbon from './wpsjs/ribbon'

function App() {
  useEffect(() => {
    window.ribbon = ribbon;
  }, [])
  return (
    <>
    </>
  )
}

export default App
