import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'
const { Content } = Layout
const LayoutIndex = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}
export default LayoutIndex
