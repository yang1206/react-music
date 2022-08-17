import { lazy } from 'react'
import { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const SearchRouter: Array<RouteObject> = [
  {
    path: '/search',
    element: lazyLoad(lazy(() => import('@/views/search/index')))
  }
]
export default SearchRouter
