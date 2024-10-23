import express, { Router } from 'express'
import * as authController from '../controllers/authcontroller'

// Initialize Router
const router: Router = express.Router()

//define Routes
router.post('/register', authController.register)
router.post('/login', authController.login)

// Export Router
export default router