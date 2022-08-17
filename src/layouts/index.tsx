import { Layout } from 'antd'
import { Outlet /*, useLocation */ } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'
const { Content } = Layout
const LayoutIndex = () => {
  // const { pathname } = useLocation()
  // console.log(pathname)
  return (
    <Layout>
      <Header />
      <Content>
        {/* TransitionGroup 会导致 useEffect 加载两次 && 使用路由懒加载第一次进入没有动画，所以暂时不用过渡动画了 */}
        {/* <TransitionGroup className="content"> */}
        {/* exit：表示退出当前页面的时候是否有动画 */}
        {/* <CSSTransition key={pathname} timeout={200} classNames="page" unmountOnExit> */}
        <Outlet />
        {/* </CSSTransition>
        </TransitionGroup> */}
      </Content>
      <Footer />
    </Layout>
  )
}
export default LayoutIndex
