import express from "express"
import { 
    validateToken,
    validateUrl 
} from "../controllers/validate.js"

const router = express.Router()

router.post('/url', validateUrl)
router.get('/token/:user_id', validateToken)

export default router