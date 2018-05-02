import { Request, Response, NextFunction } from 'express'

export let index = (req: Request, res: Response, next: NextFunction) => {
  let navclass = 'nav-home'
  res.render('index', { navclass: navclass })
}

export let about = (req: Request, res: Response, next: NextFunction) => {
  let navclass = 'nav-about'
  res.render('about', { navclass: navclass })
}
