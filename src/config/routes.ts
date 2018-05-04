import * as express from 'express'
import * as rootController from '../controllers/root'
import * as musicController from '../controllers/music'
import * as path from 'path'

export const router = express.Router()

router.get('/', rootController.index)
router.get('/about', rootController.about)

router.get('/music', musicController.index)
router.get('/music/add', musicController.add)
router.post('/music/create', musicController.create)
router.get('/music/remove', musicController.remove)
router.post('/music/destroy', musicController.destroy)

