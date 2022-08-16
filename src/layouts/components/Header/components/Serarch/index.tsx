import React, { useRef, useState, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectSearchSongList, selectFocusState, changeFocusState, getSearchSongList } from '@/store/slice/Search'
import { getSong } from '@/store/slice/Player'
import { debounce } from '@/utils/format'
import './index.less'
const Search: React.FC = () => {
  const inputRef = useRef()
  const navigate = useNavigate()
  const [recordActive, setRecordActive] = useState(-1)
  const [value, setValue] = useState('')
  const searchSongList = useAppSelector(selectSearchSongList).data
  const focusState = useAppSelector(selectFocusState).data
  const dispatch = useAppDispatch()
  const changeInput = debounce((target: { value: string }) => {
    let targetValue = target.value.trim()
    setValue(targetValue)
    if (value.length < 1) return
    // 显示下拉框
    dispatch(changeFocusState(true))
    // 发送网络请求
    dispatch(getSearchSongList(value))
  }, 100)

  // 表单回车:跳转到搜索详情
  const handleEnter = useCallback(() => {
    // 说明当前光标有”高亮当前行“
    if (recordActive >= 0) {
      // 保存value
      setValue(searchSongList[recordActive].name + '-' + searchSongList[recordActive].artists[0].name)
    }
    dispatch(changeFocusState(false))
    // 只要在搜索框回车: 都进行跳转
    redirect()
  }, [dispatch, recordActive, searchSongList])
  // 获取焦点
  const handleFocus = useCallback(() => {
    // 更改为获取焦点状态
    dispatch(changeFocusState(true))
  }, [dispatch])
  //失去搜索框焦点事件
  const handleBlur = useCallback(() => {
    setValue('')
    dispatch(changeFocusState(false))
  }, [dispatch])
  // 监控用户是否按: "上"或"下"键
  const watchKeyboard = useCallback(
    (even: { keyCode: number }) => {
      let activeNumber = recordActive
      if (even.keyCode === 38) {
        activeNumber--
        activeNumber = activeNumber < 0 ? searchSongList?.length - 1 : activeNumber
        setRecordActive(activeNumber)
      } else if (even.keyCode === 40) {
        activeNumber++
        activeNumber = activeNumber >= searchSongList?.length ? 0 : activeNumber
        setRecordActive(activeNumber)
      }
    },
    [recordActive, setRecordActive, searchSongList]
  )
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target!.value)
  }
  // 点击当前item歌曲项
  const changeCurrentSong = (id: number, item: { name: string; artists: { name: string }[] }) => {
    // 放到搜索文本框
    setValue(item.name + '-' + item.artists[0].name)
    //派发action
    dispatch(getSong(id))
    // 隐藏下拉框
    dispatch(changeFocusState(false))
    // 播放音乐
    // document.getElementById('audio').autoplay = true
  }
  //路由跳转并携带参数
  const redirect = () => {
    if (value.length > 0) {
      navigate(`/search/single?song=${value}&type=1`, {
        replace: false
      })
    }
  }
  return (
    <div className="search-Wrapper">
      <Input
        ref={inputRef}
        className="search"
        placeholder="音乐/歌手"
        size="large"
        prefix={<SearchOutlined />}
        onChange={e => changeEvent(e)}
        onInput={({ target }) => changeInput(target)}
        onFocus={handleFocus}
        onPressEnter={() => handleEnter()}
        value={value}
        onKeyDown={watchKeyboard}
        onBlur={handleBlur}
      />
      <div className="down-slider" style={{ display: focusState ? 'block' : 'none' }}>
        <div className="search-header">
          <span className="discover"></span>
        </div>

        <div className="list">
          <div className="zuo">
            <span className="song">单曲</span>
          </div>

          {/* <div className="you"> */}
          <span className="main">
            {searchSongList &&
              searchSongList.map((item, index) => {
                return (
                  <div
                    className={'item ' + (recordActive === index ? 'active' : '')}
                    key={item.id}
                    onClick={() => changeCurrentSong(item.id, item)}
                  >
                    <span>{item.name}</span>-{item.artists[0].name}
                  </div>
                )
              })}
          </span>
        </div>
      </div>
    </div>
  )
}
export default memo(Search)
