import { Router } from 'express'
import districtController from './district.controller'

const router = Router()

// router.get('/', districtController.getAll)
router.get('/:id', districtController.getById)
router.get('/:id/all', districtController.getComplete)

module.exports = router
