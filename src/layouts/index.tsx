import { HashRouter } from 'react-router-dom'
import Router from '@/routers'
import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'
const Layout = () => {
  return (
    <HashRouter>
      <Header></Header>
      <Router />
      <Footer></Footer>
    </HashRouter>
  )
}
export default Layout
