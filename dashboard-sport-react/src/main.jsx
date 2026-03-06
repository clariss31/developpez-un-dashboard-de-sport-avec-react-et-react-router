import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/main.scss'
import App from './App.jsx'

/**
 * Point d'entrée de l'application.
 * Configure le provider d'authentification, le provider utilisateur et les routes.
 * @returns {React.ReactElement} - Point d'entrée de l'application
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
