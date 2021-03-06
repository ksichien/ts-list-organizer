import { Request, Response, NextFunction } from 'express'
import * as path from 'path'
import musicModel from '../models/music'

export const navclass: string = 'nav-music'
export const jsonFile: string = path.join('public', 'data', 'music.json')

export let index = (req: Request, res: Response, next: NextFunction) => {
  const artists = musicModel.getList(jsonFile)
  res.render('music/index', { artists: artists, navclass: navclass })
}

export let add = (req: Request, res: Response, next: NextFunction) => {
  res.render('music/add', { navclass: navclass })
}

export let create = (req: Request, res: Response, next: NextFunction) => {
  const artists = musicModel.addToList(req.body.artistName, req.body.albumName, jsonFile)
  res.render('music/index', { artists: artists, navclass: navclass })
}

export let remove = (req: Request, res: Response, next: NextFunction) => {
  res.render('music/remove', { navclass: navclass })
}

export let destroy = (req: Request, res: Response, next: NextFunction) => {
  const artists = musicModel.removeFromList(req.body.artistName, req.body.albumName, jsonFile)
  res.render('music/index', { artists: artists, navclass: navclass })
}
