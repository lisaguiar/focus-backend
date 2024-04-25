import express from 'express'
import { 
    signin, 
    signup, 
    logout, 
    session
} from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.get('/session', session)

export default router