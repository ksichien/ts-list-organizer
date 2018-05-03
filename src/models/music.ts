import * as fs from 'fs'
import * as path from 'path'

interface artistList {
  name: string,
  albums: string[]
}

interface musicList {
  artists: artistList[]
}

class musicModel {
  public addToList(artist: string, album: string, jsonFile: string): artistList[] {
    let list: musicList = this.readList(jsonFile)
    let artistIndex: number = this.getArtistIndex(list, artist)
    if (artistIndex == list.artists.length) {
      let newArtist: artistList = { 'name': artist, 'albums': [ album ] }
      list.artists.push(newArtist)
    }
    else {
      list.artists[artistIndex].albums.push(album)
    }
    this.sortList(list)
    this.writeList(JSON.stringify(list), jsonFile)
    return list.artists
  }

  public getList(jsonFile: string): artistList[] {
    let list: musicList = this.readList(jsonFile)
    return list.artists
  }

  private getArtistIndex(list: musicList, artist: string): number {
    for (let index: number = 0; index < list.artists.length; index++) {
      if (list.artists[index].name == artist) {
        return index
      }
    }
    return list.artists.length
  }

  private readList(jsonFile: string): musicList {
    let raw: musicList = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    return raw
  }

  private sortList(list: musicList): void {
    list.artists.sort((a, b) => {
      let aLowerCase: string = a.name.toLowerCase()
      let bLowerCase: string = b.name.toLowerCase()
      return aLowerCase < bLowerCase ? -1 : aLowerCase > bLowerCase ? 1 : 0
    })
    for(let index: number = 0; index < list.artists.length; index++) {
      list.artists[index].albums.sort()
    }
  }

  private writeList(data: string, jsonFile: string): void {
    fs.writeFileSync(jsonFile, data, 'utf-8')
  }
}

export default new musicModel()
