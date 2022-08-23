import { forwardRef, LegacyRef } from 'react'
//使用
const Audio = (props: any, ref: LegacyRef<HTMLAudioElement>) => {
  return <audio id="audio" ref={ref} onTimeUpdate={props.timeUpdate} onEnded={props.playEnded} />
}
const forwardAudio = forwardRef(Audio)
export default forwardAudio
