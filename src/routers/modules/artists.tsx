import { lazy } from 'react'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const ArtistRouter: Array<RouteObject> = [
  {
    path: '/artist',
    element: lazyLoad(lazy(() => import('@/views/artist')))
  }
]
export default ArtistRouter
