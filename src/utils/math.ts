export function getRandom(num: number) {
  return Math.floor(Math.random() * num)
}

export const getFindIdIndex = (arr: any[], findId: any) => {
  return arr.findIndex(song => song.id === findId)
}
