import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: 'discover',
    element: lazyLoad(lazy(() => import('@/views/discover')))
  },
  {
    path: '/friend',
    element: lazyLoad(lazy(() => import('@/views/friend')))
  },
  {
    path: '/mine',
    element: lazyLoad(lazy(() => import('@/views/mine')))
  }
]
const Router = () => {
  return useRoutes(routes)
}
export default Router
