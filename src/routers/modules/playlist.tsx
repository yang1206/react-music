import { lazy } from 'react'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const PlayListRouter: Array<RouteObject> = [
  {
    path: '/playlist',
    element: lazyLoad(lazy(() => import('@/views/playlist')))
  }
]
export default PlayListRouter
