import * as fs from 'fs'
import * as path from 'path'

export class musicModel {
  public static readList(jsonFile: string) {
    let list = this.processList(jsonFile)
    return list.artists
  }

  private static processList(jsonFile: string) {
    let raw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))
    return raw
  }
}
