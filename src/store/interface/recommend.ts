export namespace Recommend {
  export interface Banners {
    imageUrl: string
    typeTitle: string
  }
  export interface perSonalizeder {
    picUrl: string
    name: string
    id: number
  }
  export interface NewAlbums {
    name: string
    artist: Array<any>
    id: number
    picUrl: string
  }
  export interface topItem {
    id?: number
    name?: string
    coverImgUrl?: string
    description?: string
    tracks?: Array<any>
  }
  export interface TopList {
    newList: topItem
    riseList: topItem
    originalList: topItem
  }
}
