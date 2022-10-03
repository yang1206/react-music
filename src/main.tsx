import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from '@/store'
// antd样式放到最上面避免初始化样式被覆盖
import 'antd/dist/antd.css'
import '@/styles/reset.css'
import 'normalize.css/normalize.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
)
