import { lazy } from 'react'
import type { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const AlbumRouter: Array<RouteObject> = [
  {
    path: '/album',
    element: lazyLoad(lazy(() => import('@/views/album'))),
  },
]
export default AlbumRouter
