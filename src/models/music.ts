import * as fs from 'fs'
import * as path from 'path'

class musicModel {
  public constructor() {
    this.getList = this.getList.bind(this)
    this.addToList = this.addToList.bind(this)
  }

  public addToList(artist: string, album: string, jsonFile: string): void {
    let list = this.readList(jsonFile)
    let artistIndex = this.getArtistIndex(list, artist)
    if (artistIndex == list.artists.length) {
      let newArtist = { 'name': artist, 'albums': [ album ] }
      list.artists.push(newArtist)
    }
    else {
      list.artists[artistIndex].albums.push(album)
    }
    this.sortList(list)
    this.writeList(JSON.stringify(list), jsonFile)
  }

  public getList(jsonFile: string): {} {
    let list = this.readList(jsonFile)
    return list.artists
  }

  private getArtistIndex(list, artist: string): number {
    for (let index = 0; index < list.artists.length; index++) {
      if (list.artists[index].name == artist) {
        return index
      }
    }
    return list.artists.length
  }

  private readList(jsonFile: string) {
    let raw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    return raw
  }

  private sortList(list): void {
    list.artists.sort((a, b) => {
      let a_name = a.name.toLowerCase()
      let b_name = b.name.toLowerCase()
      return a_name < b_name ? -1 : a_name > b_name ? 1 : 0
    })
    for(let i = 0; i < list.artists.length; i++) {
      list.artists[i].albums.sort()
    }
  }

  private writeList(data: string, jsonFile: string): void {
    fs.writeFileSync(jsonFile, data, 'utf-8')
  }
}

export default new musicModel()
