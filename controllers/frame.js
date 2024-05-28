import { db } from "../server.js"

const state = 'active'

export const getFrames = (req, res) => {
    const { project_id } = req.params

    const query = "SELECT * FROM frames WHERE project_id = ? AND state = 'active'"
    const values = [project_id]

    db.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length === 0) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json(results)
        }
    })
}

export const getFrame = (req, res) => {
    const { frame_id } = req.params

    const query = "SELECT * FROM frames WHERE frame_id = ? AND state = 'active'"
    const values = [frame_id]

    db.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length === 0) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json(results[0])
        }
    })
}

export const postFrame = (req, res) => {
    const { project_id } = req.params
    const { model_id, title, description } = req.body

    const createdDate = new Date()

    const values = [
        project_id,
        model_id,
        title,
        description,
        state,
        createdDate
    ]

    const query = "INSERT INTO frames (project_id, model_id, title, description, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }

        const query = "SELECT LAST_INSERT_ID(frame_id) AS id FROM frames ORDER BY frame_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results[0])
        })
    })
}

export const updateFrame = (req, res) => {
    const { frame_id } = req.params
    const { title, description } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE frames SET title = ?, description = ?, updatedAt = ? WHERE frame_id = ?"
    const values = [
        title, 
        description, 
        updatedDate, 
        frame_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Quadro atualizado com sucesso." })
    })
}

export const deleteFrame = (req, res) => {
    const { frame_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE frames SET state = 'disabled', updatedAt = ? WHERE frame_id = ?"
    const values = [
        updatedDate, 
        frame_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Quadro excluído com sucesso." })
    })
}