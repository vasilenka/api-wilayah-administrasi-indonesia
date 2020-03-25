import { Router } from 'express'
import regencyController from './regency.controller'

const router = Router()

router.get('/', regencyController.getAll)
router.get('/:id', regencyController.getById)
router.get('/:id/all', regencyController.getComplete)

module.exports = router
