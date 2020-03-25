import { Router } from 'express'
import provinceController from './province.controller'

const router = Router()

router.get('/', provinceController.getAll)
router.get('/:id', provinceController.getById)
router.get('/:id/all', provinceController.getComplete)

module.exports = router
