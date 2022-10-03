import { lazy } from 'react'
import type { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const SearchRouter: Array<RouteObject> = [
  {
    path: '/search',
    element: lazyLoad(lazy(() => import('@/views/search'))),
  },
]
export default SearchRouter
