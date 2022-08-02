import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
import DiscoverRouter from '@/routers/modules/discover'
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    element: lazyLoad(lazy(() => import('@/views/discover'))),
    children: [...DiscoverRouter]
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
export default routes
