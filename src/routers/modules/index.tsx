import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
import DiscoverRouter from '@/routers/modules/discover'
import SearchRouter from '@/routers/modules/search'
import PlayRouter from '@/routers/modules/playlist'
import UserRouter from '@/routers/modules/user'
import LayoutIndex from '@/layouts'
const routes: RouteObject[] = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/',
        element: <Navigate to="/discover" />
      },
      {
        path: '/discover',
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
      },
      ...SearchRouter,
      ...PlayRouter,
      ...UserRouter
    ]
  }
]
export default routes
