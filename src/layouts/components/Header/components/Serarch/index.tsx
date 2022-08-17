import React, { useRef, useState, useEffect, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, InputRef } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectSearchSongList, selectFocusState, changeFocusState, getSearchSongList } from '@/store/slice/Search'
import { getSong } from '@/store/slice/Player'
import { debounce } from '@/utils/format'
import './index.less'
const Search: React.FC = () => {
  const inputRef = useRef<InputRef>(null)
  const navigate = useNavigate()
  const [recordActive, setRecordActive] = useState(-1)
  const [value, setValue] = useState('')
  const searchSongList = useAppSelector(selectSearchSongList).data
  const focusState = useAppSelector(selectFocusState).data
  const dispatch = useAppDispatch()
  const changeInput = debounce((target: { value: string }) => {
    let targetValue = target.value.trim()
    setValue(targetValue)
    if (targetValue.length < 1) return
    // 显示下拉框
    dispatch(changeFocusState(true))
    // 发送网络请求
    dispatch(getSearchSongList(targetValue))
  }, 100)
  //(根据当前焦点状态设置input焦点)
  useEffect(() => {
    // 获取焦点
    if (focusState) inputRef.current.focus()
    // 失去焦点
    else inputRef.current.blur()
  }, [focusState])
  // 表单回车:跳转到搜索详情
  const handleEnter = useCallback(() => {
    // 说明当前光标有”高亮当前行“
    if (recordActive >= 0) {
      // 保存value
      setValue(searchSongList[recordActive].name + '-' + searchSongList[recordActive].artists[0].name)
    }
    dispatch(changeFocusState(false))
    // 只要在搜索框回车: 都进行跳转
    console.log(value)
    redirect()
  }, [dispatch, recordActive, searchSongList])
  // 获取焦点
  const handleFocus = useCallback(() => {
    inputRef.current.select()
    // 更改为获取焦点状态
    dispatch(changeFocusState(true))
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
      } else if (even.keyCode === 27) {
        dispatch(changeFocusState(false))
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
    // dispatch(changeFocusState(false))
  }
  //路由跳转并携带参数
  const redirect = () => {
    if (value.length > 0) {
      navigate(`/search/single?song=${value}&type=1`, {
        replace: false
      })
    }
  }
  // icons键盘图标
  const icons = (
    <div className="icons-wrapper">
      <div className="ctrl-wrapper">
        <svg width="15" height="15" className="DocSearch-Control-Key-Icon">
          <path
            d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
            strokeWidth="1.2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="square"
          ></path>
        </svg>
      </div>
      <div className="k-wrapper">k</div>
    </div>
  )
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
        suffix={icons}
      />
      <div className="down-slider" style={{ display: focusState ? 'block' : 'none' }}>
        <div className="search-header">
          <span className="discover"></span>
        </div>

        <div className="list">
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
