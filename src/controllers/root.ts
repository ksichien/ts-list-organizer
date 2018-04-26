import { Request, Response } from 'express'

class rootController {
  constructor() {    
    this.index = this.index.bind(this)
  }

  public index(req: Request, res: Response) {
    let navclass = 'nav-home'
    res.render('index', { navclass: navclass })
  }

  public about(req: Request, res: Response) {
    let navclass = 'nav-about'
    res.render('about', { navclass: navclass })
  }
}

export default new rootController()
