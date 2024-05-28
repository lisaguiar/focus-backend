import { db } from "../server.js"

const state = 'active'

export const getKanbanColumns = (req, res) => {
    const { frame_id } = req.params

    const query = "SELECT * FROM kanban_columns WHERE frame_id = ? AND state = 'active'"
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

export const postKanbanColumn = (req, res) => {
    const { frame_id } = req.params
    const { title } = req.body

    const createdDate = new Date()

    const values = [
        frame_id,
        title,
        state,
        createdDate
    ]

    const query = "INSERT INTO kanban_columns (frame_id, title, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }

        const query = "SELECT LAST_INSERT_ID(kanbancolumn_id) AS id FROM kanban_columns ORDER BY kanbancolumn_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results[0])
        })
    })
}

export const updateKanbanColumn = (req, res) => {
    const { kanbancolumn_id } = req.params
    const { title } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE kanban_columns SET title = ?, updatedAt = ? WHERE kanbancolumn_id = ?"
    const values = [
        title, 
        updatedDate, 
        kanbancolumn_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Coluna atualizada com sucesso." })
    })
}

export const deleteKanbanColumn = (req, res) => {
    const { kanbancolumn_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE kanban_columns SET state = 'disabled', updatedAt = ? WHERE kanbancolumn_id = ?"
    const values = [
        updatedDate, 
        kanbancolumn_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Coluna desativada com sucesso." })
    })
}

export const getKanbanCards = (req, res) => {
    const { frame_id } = req.params

    const query = "SELECT a.*, b.kanbancolumn_id FROM kanban_cards a JOIN kanban_columns b WHERE b.frame_id = ? AND a.kanbancolumn_id = b.kanbancolumn_id AND a.state = 'active'"
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

export const postKanbanCard = (req, res) => {
    const { kanbancolumn_id } = req.params
    const { priority_id, userdesktop_id, member_id, title, description, deadline } = req.body

    const createdDate = new Date()

    const values = [
        kanbancolumn_id,
        priority_id,
        userdesktop_id,
        member_id,
        title,
        description,
        deadline,
        state,
        createdDate
    ]

    const query = "INSERT INTO kanban_cards (kanbancolumn_id, priority_id, userdesktop_id, member_id, title, description, deadline, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }

        const query = "SELECT LAST_INSERT_ID(kanbancard_id) AS id FROM kanban_cards ORDER BY kanbancard_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results[0])
        })
    })
}

export const updateKanbanCard = (req, res) => {
    const { kanbancard_id } = req.params
    const { title, description, deadline } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE kanban_cards SET title = ?, description = ?, deadline = ?, updatedAt = ? WHERE kanbancard_id = ?"
    const values = [
        title, 
        description, 
        deadline, 
        updatedDate, 
        kanbancard_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Cartão atualizado com sucesso." })
    })
}

export const deleteKanbanCard = (req, res) => {
    const { kanbancard_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE kanban_cards SET state = 'disabled', updatedAt = ? WHERE kanbancard_id = ?"
    const values = [
        updatedDate, 
        kanbancard_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Cartão excluído com sucesso." })
    })
}