import { db } from "../server.js"
import jwt from 'jsonwebtoken'

export const validateUrl = (req, res) => {
    const { user_id, desktop_id, project_id, frame_id } = req.body

    if (!frame_id || frame_id === null) {
        if (!project_id || frame_id === null) {
            if (!desktop_id || desktop_id === null) {
                return res.status(200).json({ authorized: true })
            }
            const sql = `SELECT * FROM desktop a JOIN user_desktop b WHERE a.desktop_id = ${desktop_id} AND b.user_id = ${user_id} AND a.desktop_id = b.desktop_id AND a.state = 'active' AND b.state = 'active'`

            db.query(sql, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: "Houve um erro na conexão com o servidor." }) 
                }
                if (results.length > 0) {
                    return res.status(200).json({ authorized: true })
                } else {
                    return res.status(200).json({ authorized: false })
                }
            })
        } else {
            const sql = `SELECT * FROM desktop a JOIN user_desktop b JOIN projects c WHERE a.desktop_id = ${desktop_id} AND b.user_id = ${user_id} AND c.project_id = ${project_id} AND c.desktop_id = b.desktop_id AND a.desktop_id = b.desktop_id AND a.state = 'active' AND b.state = 'active' AND c.state = 'active'`

            db.query(sql, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: "Houve um erro na conexão com o servidor." }) 
                } 
                if (results) {
                    return res.status(200).json({ authorized: true })
                } else {
                    return res.status(200).json({ authorized: false })
                }
            })
        } 
    }
}

export const validateToken = (req, res) => {
    const { user_id } = req.params
    const token = req.cookies['token']

    if (!token) {
        return res.status(200).json({ authorized: false })
    }
    if (user_id) {
        try {
            const secretKey = process.env.SECRET_KEY
            const decoded = jwt.verify(token, secretKey)
    
            if (String(decoded.user_id) !== String(user_id)) {
                return res.status(200).json({ authorized: false })
            }
            return res.status(200).json({ authorized: true })
        } catch (error) {
            return res.status(200).json({ authorized: false })
        }    
    } else {
        return res.status(200).json({ authorized: false })
    }
}