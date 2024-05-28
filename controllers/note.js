import { db } from "../server.js"

const state = 'active'

export const getNotes = (req, res) => {
    const { frame_id } = req.params

    const query = "SELECT * FROM notes WHERE frame_id = ? AND state = 'active'"
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

export const getNote = (req, res) => {
    const { note_id } = req.params

    const query = "SELECT * FROM notes WHERE note_id = ? AND state = 'active'"
    const values = [note_id]

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

export const postNote = (req, res) => {
    const { frame_id } = req.params
    const { userdesktop_id, title, content } = req.body

    const createdDate = new Date()

    const values = [
        frame_id,
        userdesktop_id,
        title,
        content,
        state,
        createdDate
    ]

    const query = "INSERT INTO notes (frame_id, userdesktop_id, title, content, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }

        const query = "SELECT LAST_INSERT_ID(note_id) AS id FROM notes ORDER BY note_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results[0])
        })
    })
}

export const updateNote = (req, res) => {
    const { note_id } = req.params
    const { title, content } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE note_id = ?"
    const values = [
        title, 
        content, 
        updatedDate, 
        note_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Nota atualizada com sucesso." })
    })
}

export const deleteNote = (req, res) => {
    const { note_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE notes SET state = 'disabled', updatedAt = ? WHERE note_id = ?"
    const values = [
        updatedDate,
        note_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Nota desativada com sucesso." })
    })
}