import React, {
  createElement,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Avatar, Comment, Tooltip, message } from 'antd'
import CommentsHeader from './components/CommentsHeader'
import SongCommentsStyle from './index.module.less'
import {
  changeCurrentTotal,
  getHotComment,
  selectHotComments,
  selectSong,
} from '@/store/slice/Player'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import {
  changeIsVisible,
  selectLoginState,
  selectProfile,
} from '@/store/slice/Login'
import { getSongComment, sendLikeComment, sendSongComment } from '@/api/song'
import { getCount } from '@/utils/format'
import Pagination from '@/components/Pagination'
import CurComment from '@/components/Comment'

const SongComments: React.FC = () => {
  const [songComment, setSongComment] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [flag, setFlag] = useState(false)
  const [liked, setLiked] = useState([]) // 歌曲的点赞状态
  const hotComments = useAppSelector(selectHotComments).data
  const currentSongId = useAppSelector(selectSong).data.id
  const isLogin = useAppSelector(selectLoginState).data
  const avatarUrl = useAppSelector(selectProfile).data.avatarUrl
  const dispatch = useAppDispatch()
  // other hooks
  useEffect(() => {
    dispatch(getHotComment(currentSongId))
    getSongComment(currentSongId, null, null).then((res) => {
      setSongComment(res.comments)
      // console.log(res)
      setTotal(res.total)
      dispatch(changeCurrentTotal(res.total))
      // likedArr.push(res)
      // setTotal(res.total)
    })
  }, [dispatch, currentSongId])
  function formatDate(time = +new Date()) {
    const date = new Date(time + 8 * 3600 * 1000) // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ')
  }
  // 点赞评论
  const likeComment = (index, data) => {
    if (!isLogin) {
      // 没登陆
      dispatch(changeIsVisible(true))
    }
    else {
      if (!flag) {
        liked[index].liked = true
        liked[index].count += 1
        setLiked(liked)
        /* 调点赞接口 */
        // console.log(data)
        sendLikeComment(currentSongId, data.commentId, 1).then((res) => {
          if (res.code === 200)
            message.success('点赞成功')
          else message.success('请稍后再试')
        })
      }
      else {
        liked[index].liked = false
        liked[index].count -= 1
        setLiked(liked)
        setFlag(true)
        /* 调取消点赞接口 */
        // console.log('disliked')
        /* 调取消点赞赞接口 */
        sendLikeComment(currentSongId, data.commentId, 0).then((res) => {
          if (res.code === 200)
            message.success('取消点赞成功')
          else message.success('取消点赞成功')
        })
      }
      setFlag(!flag)
    }
  }

  // 分页
  const changePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage)
      // offset=(当前页数-1)*limit
      const targePageCount = (currentPage - 1) * 20
      getSongComment(currentSongId, 20, targePageCount).then((res) => {
        setSongComment(res.comments)
        setTotal(res.total)
      })
    },
    [currentSongId],
  )

  // template html action
  // 点赞HTML
  const getLikeTemplateAction = (
    item: { liked: any; likedCount: any },
    index: number,
  ) => {
    liked.push({
      liked: item.liked,
      count: item.likedCount,
    })
    return [
      <Tooltip key="comment-basic-like" title="Like" className="comment-like">
        <span onClick={() => likeComment(index, item)}>
          {createElement(
            liked[index].liked === true ? LikeFilled : LikeOutlined,
          )}
          <span className="comment-action">{getCount(liked[index].count)}</span>
        </span>
      </Tooltip>,
    ]
  }
  // 评论歌曲校验(获取焦点)
  const commentSongcheckout = () => {
    // 没登录
    if (!isLogin)
      dispatch(changeIsVisible(true))
  }
  // 评论成功
  const commentCallbackOk = (value: string) => {
    sendSongComment(currentSongId, value).then((res) => {
      if (res.code === 200) {
        message.success('评论成功').then(() => {
          getSongComment(currentSongId, null, null).then((res) => {
            setSongComment(res.comments)
            setTotal(res.total)
          })
        })
      }
    })
  }
  return (
    <div className={SongCommentsStyle.SongCommentWrapper}>
      <CommentsHeader title="评论" />
      {/* 评论内容 */}
      <CurComment
        onFocus={() => commentSongcheckout()}
        callbackOk={value => commentCallbackOk(value)}
        isLogin={isLogin}
        photo={avatarUrl}
      />
      {/* 精彩评论 */}
      <div className={SongCommentsStyle.WonderfulWrapper}>
        <div className="header-comment">精彩评论</div>
        {hotComments
          && hotComments.map((item) => {
            return (
              <Comment
                // actions={getLikeTemplateAction(item, index)}
                key={item.commentId}
                author={item.user.nickname}
                avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={formatDate(item.time)}>
                    {formatDate(item.time).slice(
                      0,
                      Number(formatDate(item.time).indexOf(' ')),
                    )}
                  </Tooltip>
                }
              />
            )
          })}
      </div>
      {/* 最新评论 */}
      <div className={SongCommentsStyle.SoNewWrapper}>
        <div className="header-comment">最新评论</div>
        {songComment
          && songComment.map((item, index) => {
            return (
              <Comment
                actions={getLikeTemplateAction(item, index)}
                key={item.commentId}
                author={item.user.nickname}
                avatar={<Avatar src={item.user.avatarUrl} alt="Han Solo" />}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={formatDate(item.time)}>
                    {formatDate(item.time).slice(
                      0,
                      Number(formatDate(item.time)),
                    )}
                  </Tooltip>
                }
              />
            )
          })}
      </div>
      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        pageSize={20}
        total={total}
        onPageChange={currentPage => changePage(currentPage)}
      />
    </div>
  )
}
export default memo(SongComments)
