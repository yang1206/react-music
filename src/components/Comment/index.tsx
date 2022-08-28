import { Comment, Avatar, Form, Button, Input, message } from 'antd'
import React, { useState } from 'react'

const { TextArea } = Input

interface EditorProps {
  onChange: (e: any) => void
  onSubmit: () => void
  submitting: boolean
  value: string
  onFocus: (value: any) => void
}
const Editor: React.FC<EditorProps> = ({ onChange, onSubmit, submitting, value, onFocus }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} onFocus={e => onFocus(e)} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        评论
      </Button>
    </Form.Item>
  </>
)
interface Props {
  onFocus: (value?: any) => void
  callbackOk: (value: any) => void
  isLogin: boolean
  photo: string
}
const CurComment: React.FC<Props> = props => {
  // const [comments, setComments] = useState([])
  const [submitting] = useState(false)
  const [value, setValue] = useState('')
  const handleSubmit = () => {
    if (!value) {
      message.warning('请输入评论内容')
      return
    }
    props.callbackOk(value)
  }

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setValue(e.target.value)
  }

  const handleFocus = (e: { target: { blur: () => any } }) => {
    !props.isLogin && e.target.blur()
    props.onFocus(value)
  }

  return (
    <>
      <Comment
        avatar={<Avatar src={props.photo} alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            onFocus={(e: any) => handleFocus(e)}
          />
        }
      />
    </>
  )
}
export default React.memo(CurComment)
