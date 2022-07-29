import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/css/reset.css'
import 'normalize.css/normalize.css'
import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
