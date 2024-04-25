import express from "express"
import { 
    getDesktop, 
    getDesktops, 
    postDesktop
} from "../controllers/desktop.js"

const router = express.Router()

router.get('/:user_id', getDesktops)
router.get('/single/:desktop_id', getDesktop)
router.post('/:user_id', postDesktop)

export default router