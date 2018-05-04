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
    const list: musicList = this.readList(jsonFile)
    const artistIndex: number = this.getArtistIndex(list, artist)
    let modifiedList: musicList
    if (artistIndex == list.artists.length) {
      const newArtist: artistList = { 'name': artist, 'albums': [ album ] }
      modifiedList = { "artists": [ ...list.artists, newArtist ] }
    }
    else {
      const newArtistAlbums: string[] = [ ...list.artists[artistIndex].albums, album ]
      const newArtist: artistList = { 'name': artist, 'albums': newArtistAlbums }
      modifiedList = { "artists": list.artists.map((item) => item.name == list.artists[artistIndex].name ? newArtist : item )}
    }
    const sortedList: musicList = this.sortList(modifiedList)
    this.writeList(JSON.stringify(sortedList), jsonFile)
    return sortedList.artists
  }

  public getList(jsonFile: string): artistList[] {
    const list: musicList = this.readList(jsonFile)
    return list.artists
  }

  public removeFromList(artist: string, album: string, jsonFile: string): artistList[] {
    const list: musicList = this.readList(jsonFile)
    const artistIndex: number = this.getArtistIndex(list, artist)
    if (artistIndex == list.artists.length) {
      return list.artists
    }
    let modifiedList: musicList
    if (list.artists[artistIndex].albums.length == 1) {
      const artistToRemove: artistList = { 'name': artist, 'albums': [ album ] }
      modifiedList = { "artists": list.artists.filter(item => item.name !== artistToRemove.name) }
    }
    else {
      const modifiedArtistAlbums: string[] = list.artists[artistIndex].albums.filter(a => a !== album)
      const modifiedArtist: artistList = { 'name': artist, 'albums': modifiedArtistAlbums }
      modifiedList = { "artists": list.artists.map((item) => item.name == list.artists[artistIndex].name ? modifiedArtist : item )}
    }
    const sortedList: musicList = this.sortList(modifiedList)
    this.writeList(JSON.stringify(sortedList), jsonFile)
    return sortedList.artists
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
    const raw: musicList = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    return raw
  }

  private sortList(list: musicList): musicList {
    list.artists.sort((a, b) => {
      const aLowerCase: string = a.name.toLowerCase()
      const bLowerCase: string = b.name.toLowerCase()
      return aLowerCase < bLowerCase ? -1 : aLowerCase > bLowerCase ? 1 : 0
    })
    for(let index: number = 0; index < list.artists.length; index++) {
      list.artists[index].albums.sort()
    }
    return list
  }

  private writeList(data: string, jsonFile: string): void {
    fs.writeFileSync(jsonFile, data, 'utf-8')
  }
}

export default new musicModel()
