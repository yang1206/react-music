import React, { memo } from 'react'
import { useAppSelector } from '@/hooks/useStore'
import { selectCurrentTotal } from '@/store/slice/Player'
import CommentsHeaderStyle from './index.module.less'
interface Props {
  title: string
}
const CommentsHeader: React.FC<Props> = (props: { title: any }) => {
  const { title } = props

  const commentTotal = useAppSelector(selectCurrentTotal).data

  return (
    <div className={CommentsHeaderStyle.CommentsHeaderWrapper}>
      <div className={CommentsHeaderStyle.CommentsHeaderLeft}>
        <h2 className="hot-title">
          <a href="/discover/recommend" className="no-link hot-text">
            {title}
          </a>
        </h2>
        <span style={{ marginLeft: '10px' }}>{commentTotal && <span>共{commentTotal}条评论</span>}</span>
      </div>
    </div>
  )
}
export default memo(CommentsHeader)
