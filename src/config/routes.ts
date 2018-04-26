import * as express from 'express'
import rootController from '../controllers/root'
import musicController from '../controllers/music'

export const router = express.Router()

router.get('/', rootController.index)
router.get('/about', rootController.about)

router.get('/music', musicController.index)
