import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme } from './utils/Themes.js'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Router } from 'react-router-dom'
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
     <BrowserRouter>
      <Navbar />
      </BrowserRouter> 
    </ThemeProvider>
  )
}

export default App
