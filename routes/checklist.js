import express from "express"
import { 
    deleteChecklist, 
    getChecklist, 
    getChecklists, 
    postChecklist, 
    updateChecklist 
} from "../controllers/checklist.js"

const router = express.Router()

router.get('/:frame_id', getChecklists)
router.get('/single/:checklist_id', getChecklist)
router.post('/:frame_id', postChecklist)
router.patch('/:checklist_id', updateChecklist)
router.patch('/delete/:checklist_id', deleteChecklist)

export default router