import { useLocation, Navigate } from 'react-router-dom'
import { cancelAllRequest } from '@/service'
import { searchRoute /*, handleRouter*/ } from '@/utils/format'
import routes from '@/routers/modules'
import { store } from '@/store'
/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
  const route = searchRoute(pathname, routes)
  // * 在跳转路由之前，清除所有的请求
  cancelAllRequest()

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children

  // * 判断是否有Token,cookie和登陆状态
  const isLogin = store.getState().login.isLogin
  const cookie = store.getState().login.cookie
  const token = store.getState().login.token
  if (!token || !cookie || !isLogin) return <Navigate to="/" replace />

  // * 如果访问的地址没有在路由表中重定向到403页面
  // let routerList = handleRouter(routes)
  // if (routerList.indexOf(pathname) == -1) {
  //   return <Navigate to="/403" />
  // }

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}
export default AuthRouter
