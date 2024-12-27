import express from 'express'
import { register , login , logout , verifyEmail ,forgotPassword, resetPassword} from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.post('/verify', verifyEmail)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token' , resetPassword)
export default router
