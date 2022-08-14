export namespace Recommend {
  export interface SongListParams {
    limit: number
  }
  export interface TopAlbums extends SongListParams {
    id?: number
    offset?: number
    area?: string
    type?: string
    year?: number
    month?: number
  }
  export interface NewAlbums extends SongListParams {
    offset?: number
    area?: string
  }
  export interface TopList {
    idx: number
  }
  export interface Playlist {
    id: number
  }
}
export namespace Song {
  export interface SongDetail {
    ids: number
  }
  export interface lyric {
    id: number
  }
}
