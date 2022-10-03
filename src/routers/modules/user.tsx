import { lazy } from 'react'
import type { RouteObject } from '@/routers/interface'
import lazyLoad from '@/routers/utils/lazyLoad'
const UserRouter: Array<RouteObject> = [
  {
    path: '/user',
    element: lazyLoad(lazy(() => import('@/views/user'))),
    meta: {
      title: '用户中心',
      requiresAuth: true,
    },
  },
]
export default UserRouter
