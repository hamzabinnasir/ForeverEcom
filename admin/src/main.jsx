// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AmdinContextProvider from './context/AdminContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <AmdinContextProvider>
    <App />
  </AmdinContextProvider>
)
