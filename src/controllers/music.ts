import { Request, Response, NextFunction } from 'express'
import * as path from 'path'
import musicModel from '../models/music'

export let navclass = 'nav-music'
export let jsonFile = path.join('public', 'data', 'music.json')

export let index = (req: Request, res: Response, next: NextFunction) => {
  let artists = musicModel.getList(jsonFile)
  res.render('music/index', { artists: artists, navclass: navclass })
}

export let add = (req: Request, res: Response, next: NextFunction) => {
  res.render('music/add', { navclass: navclass })
}

export let create = (req: Request, res: Response, next: NextFunction) => {
  musicModel.addToList(req.body.artistName, req.body.albumName, jsonFile)
  let artists = musicModel.getList(jsonFile)
  res.render('music/index', { artists: artists, navclass: navclass })
}
