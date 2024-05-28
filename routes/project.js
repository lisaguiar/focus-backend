import express from "express"
import { 
    deleteProject, 
    getProject, 
    getProjects, 
    postProject,
    updateProject 
} from "../controllers/project.js"

const router = express.Router()

router.get('/:desktop_id', getProjects)
router.get('/single/:project_id', getProject)
router.post('/:desktop_id', postProject)
router.patch('/:project_id', updateProject)
router.patch('/delete/:project_id', deleteProject)

export default router