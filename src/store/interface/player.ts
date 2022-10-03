export namespace Player {
  export interface ar {
    id: number
    name: string
  }
  export interface al {
    id: number
    name: string
    picUrl: string
    pic_str: string
    pic: number
  }
  export interface SongDetail {
    name: string
    id: number | null
    publishTime: number | null
    ar: Array<any>
    al: al
    dt: number
    [key: string]: any
  }
  export interface Lyric {
    content: string
    time: number
  }
}
