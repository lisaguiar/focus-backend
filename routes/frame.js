import express from "express"
import { 
    deleteFrame, 
    getFrame, 
    getFrames, 
    postFrame, 
    updateFrame 
} from "../controllers/frame.js"

const router = express.Router()

router.get('/:project_id', getFrames)
router.get('/single/:frame_id', getFrame)
router.post('/:project_id', postFrame)
router.patch('/:frame_id', updateFrame)
router.patch('/delete/:frame_id', deleteFrame)

export default router