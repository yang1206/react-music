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

export namespace SongList {
  export interface SongListDetail {
    id: string
  }
}

export namespace Login {
  export interface goPhoneLogin {
    phone: string
    password?: string | undefined
    countrycode?: string
    md5_password?: string
  }
  export interface goEmailLogin {
    email: string
    password?: string
    md5_password: string
  }
  export interface Register {
    captcha: string
    phone: number
    password: string
    nickname: string
  }
}

export namespace User {
  export interface userSongList {
    uid: string
  }
}
