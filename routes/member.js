import express from "express"
import { 
    deleteMember, 
    getMembers, 
    postMember, 
    selectUser, 
    updateMember 
} from "../controllers/member.js"

const router = express.Router()

router.get('/:desktop_id', getMembers)
router.post('/:desktop_id', postMember)
router.patch('/:userdesktop_id', updateMember)
router.patch('/delete/:userdesktop_id', deleteMember)

export default router