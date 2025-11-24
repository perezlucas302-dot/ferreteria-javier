import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Importa tu componente de ferretería
import './index.css' // Importa los estilos de Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Acá le decimos que dibuje la app de la ferretería */}
    <App />
  </React.StrictMode>)