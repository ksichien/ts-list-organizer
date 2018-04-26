import * as path from 'path'
import { Request, Response } from 'express'
import { musicModel } from '../models/music'

class musicController {
  public constructor() {    
    this.index = this.index.bind(this)
  }

  public index(req: Request, res: Response) {
    let artists = musicModel.readList(path.join('public', 'data', 'music.json'))
    let navclass = 'nav-music'
    res.render('music/index', { artists: artists, navclass: navclass })
  }
}

export default new musicController()
