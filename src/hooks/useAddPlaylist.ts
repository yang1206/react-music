import { message } from 'antd'
import { useAppDispatch } from './useStore'
import { getSong } from '@/store/slice/Player'
import { getFindIdIndex } from '@/utils/math'

/**
 * 调用该函数:传递播放列表
 * @param {Array} playlist redux保存中播放列表
 */
export function useAddPlaylist(playlist: any[]) {
  const dispatch = useAppDispatch()
  return (e: { preventDefault: () => any }, id: number) => {
    // 阻止超链接跳转
    e.preventDefault && e.preventDefault()
    // 获取歌曲详情,添加到播放列表
    dispatch(getSong({ id, isPlay: false }))
    // 提示添加成功或失败
    const index = getFindIdIndex(playlist, id)
    switch (index) {
      case -1:
        message.success({ content: '添加成功' })
        break
      default:
        message.success({ content: '不能添加重复的歌曲' })
        break
    }
  }
}
