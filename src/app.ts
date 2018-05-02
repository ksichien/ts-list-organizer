import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as routes from './config/routes'

class App {
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  public app: express.Application

  private config(): void {
    // port
    const port: number = 3000
    this.app.set('port', process.env.PORT || port)
    // logging
    this.app.use(morgan('dev'))
    // body parser middleware
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))
    // view engine
    this.app.set('views', path.join(__dirname, '..', 'views'))
    this.app.set('view engine', 'ejs')
    // bootstrap css/js
    this.app.use('/css', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css'))) // redirect bootstrap CSS
    this.app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist'))) // redirect jquery JS
    this.app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'popper.js', 'dist'))) // redirect popper JS
    this.app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js'))) // redirect bootstrap JS
    // custom css/js
    this.app.use('/stylesheets', express.static(path.join(__dirname, '..', 'public', 'stylesheets')))
    this.app.use('/javascripts' ,express.static(path.join(__dirname, '..', 'public', 'javascripts')))
  }

  private routes(): void {
    this.app.use('/', routes.router)
  }
}

export default new App().app
