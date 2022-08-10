export namespace Player {
  export type ar = {
    id: number
    name: string
  }
  export type al = {
    id: number
    name: string
    picUrl: string
    pic_str: string
    pic: number
  }
  export interface SongDetail {
    name: string
    id: number
    publishTime: number
    ar: Array<ar>
    al: Array<al>
  }
}
