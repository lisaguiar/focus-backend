import express from "express"
import { 
    deleteDesktop,
    getDesktop, 
    getDesktops, 
    postDesktop,
    updateDesktop
} from "../controllers/desktop.js"

const router = express.Router()

router.get('/:user_id', getDesktops)
router.get('/single/:desktop_id', getDesktop)
router.post('/:user_id', postDesktop)
router.patch('/:desktop_id', updateDesktop)
router.patch('/delete/:desktop_id', deleteDesktop)

export default router