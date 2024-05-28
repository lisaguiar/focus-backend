import { db } from "../server.js"

const state = 'active'

export const getChecklists = (req, res) => {
    const { frame_id } = req.params

    const query = "SELECT * FROM checklist WHERE frame_id = ? AND state = 'active'"
    const values = [frame_id]

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

export const getChecklist = (req, res) => {
    const { checklist_id } = req.params

    const query = "SELECT * FROM checklist WHERE checklist_id = ? AND state = 'active'"
    const values = [checklist_id]

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

export const postChecklist = (req, res) => {
    const { frame_id } = req.params
    const { userdesktop_id, priority_id, title, description, deadline } = req.body

    const marked = "false"
    const createdDate = new Date()

    const values = [
        frame_id,
        userdesktop_id,
        priority_id,
        title,
        description,
        marked,
        deadline,
        state,
        createdDate
    ]

    const query = "INSERT INTO checklist (frame_id, userdesktop_id, priority_id, title, description, marked, deadline, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }

        const query = "SELECT LAST_INSERT_ID(checklist_id) AS id FROM checklist ORDER BY checklist_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results[0])
        })
    })
}

export const updateChecklist = (req, res) => {
    const { checklist_id } = req.params
    const { title, description, marked, deadline } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE checklist SET title = ?, description = ?, marked = ?, deadline = ?, updatedAt = ? WHERE checklist_id = ?"
    const values = [
        title, 
        description, 
        marked, 
        deadline, 
        updatedDate, 
        checklist_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Checklist atualizado com sucesso." })
    })
}

export const deleteChecklist = (req, res) => {
    const { checklist_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE checklist SET state = 'disabled', updatedAt = ? WHERE checklist_id = ?"
    const values = [
        updatedDate, 
        checklist_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Checklist desativado com sucesso." })
    })
}