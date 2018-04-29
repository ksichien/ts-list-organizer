import * as path from 'path'
import { Request, Response } from 'express'
import musicModel from '../models/music'

class musicController {
  private jsonFile: string
  
  public constructor() {    
    this.index = this.index.bind(this)
    this.jsonFile = path.join('public', 'data', 'music.json')
  }

  public index(req: Request, res: Response) {
    let artists = musicModel.getList(this.jsonFile)
    let navclass = 'nav-music'
    res.render('music/index', { artists: artists, navclass: navclass })
  }
}

export default new musicController()
