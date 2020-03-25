import { Router } from 'express'
import villageController from './village.controller'

const router = Router()

// router.get('/', villageController.getAll)
router.get('/:id', villageController.getById)

module.exports = router
