import { useEffect, memo } from 'react'
import { message, Skeleton } from 'antd'

const Auth = (props: { showModal: () => void; flag: boolean; to: () => void }) => {
  const { flag } = props
  useEffect(() => {
    // 没登录
    if (!flag) {
      //   message.warning('请先登录, 再看每日推荐歌单', {
      //     onClose() {
      //       console.log('message关闭')
      //     }
      //   })
      message.loading('请先登录, 再看每日推荐歌单', 2).then(() => {
        // props.history.push('/')
        props.to()
        props.showModal()
      })
    }
  }, [flag, props])
  return (
    <div style={{ display: !flag ? 'block' : 'none' }}>
      <Skeleton active />
    </div>
  )
}
export default memo(Auth)
