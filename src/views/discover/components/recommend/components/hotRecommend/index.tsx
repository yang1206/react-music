import React, { useEffect, memo } from 'react'
import RcmHeader from '@/components/RcmHeader'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { getPersonalized, selectPersonalized } from '@/store/reducer/recommend'
const HotRecommend: React.FC = () => {
  const keywordClick = () => {}
  const props = {
    title: '热门推荐',
    keywords: ['华语', '流行', '民谣', '摇滚', '电子'],
    keywordClick: keywordClick
  }
  const perSonalized = useAppSelector(selectPersonalized)
  console.log(perSonalized)
  const dispatch = useAppDispatch()
  useEffect(() => {
    //请求数据
    //TODO把数据请求从redux拿出来，使用Hook写
    dispatch(getPersonalized())
  }, [dispatch])
  return (
    <div>
      <RcmHeader {...props} />
    </div>
  )
}
export default memo(HotRecommend)
