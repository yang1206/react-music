import { lazy } from 'react'
import { RouteObject } from '@/routers/interface'
import { Navigate } from 'react-router-dom'
import lazyLoad from '@/routers/utils/lazyLoad'
import Recommend from '@/views/discover/ChildPages/recommend'
const HomeRouter: Array<RouteObject> = [
  {
    path: '/discover',
    element: <Navigate to="/discover/recommend" />
  },
  {
    path: '/discover/recommend',
    element: <Recommend />
    // index: true
  },
  {
    path: '/discover/playlist',
    element: lazyLoad(lazy(() => import('@/views/discover/ChildPages/songs')))
  },
  {
    path: '/discover/album',
    element: lazyLoad(lazy(() => import('@/views/discover/ChildPages/album')))
  },
  {
    path: '/discover/ranking',
    element: lazyLoad(lazy(() => import('@/views/discover/ChildPages/ranking')))
  },
  {
    path: '/discover/artist',
    element: lazyLoad(lazy(() => import('@/views/discover/ChildPages/artist')))
  },
  {
    path: '/discover/song',
    element: lazyLoad(lazy(() => import('@/views/player')))
  }
]

export default HomeRouter
