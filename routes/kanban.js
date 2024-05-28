import express from "express"
import { 
    deleteKanbanCard, 
    deleteKanbanColumn, 
    getKanbanCards, 
    getKanbanColumns, 
    postKanbanCard, 
    postKanbanColumn, 
    updateKanbanCard, 
    updateKanbanColumn 
} from "../controllers/kanban.js"

const router = express.Router()

router.get('/column/:frame_id', getKanbanColumns)
router.get('/card/:frame_id', getKanbanCards)
router.post('/column/:frame_id', postKanbanColumn)
router.post('/card/:kanbancolumn_id', postKanbanCard)
router.patch('/column/:kanbancolumn_id', updateKanbanColumn)
router.patch('/card/:kanbancard_id', updateKanbanCard)
router.patch('/column/delete/:kanbancolumn_id', deleteKanbanColumn)
router.patch('/card/delete/:kanbancard_id', deleteKanbanCard)

export default router