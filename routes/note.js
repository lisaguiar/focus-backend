import express from "express"
import { 
    deleteNote, 
    getNote, 
    getNotes, 
    postNote, 
    updateNote 
} from "../controllers/note.js"

const router = express.Router()

router.get('/:frame_id', getNotes)
router.get('/single/:note_id', getNote)
router.post('/:frame_id', postNote)
router.patch('/:note_id', updateNote)
router.patch('/delete/:note_id', deleteNote)

export default router