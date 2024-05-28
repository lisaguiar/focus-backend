import { db } from "../server.js"
import { format } from "date-fns"

const state = "active"

export const getDesktops = (req, res) => {
    const { user_id } = req.params

    const sql = "SELECT a.*, b.id, b.permission_id FROM desktop a JOIN user_desktop b WHERE b.user_id = ? AND a.id = b.desktop_id AND a.state = 'active' AND b.state = 'active'"
    const values = [ user_id ]

    db.query(sql, values, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." }) 
        }
        const { query } = req.query
        if (query) {
            const keys = ["title"]

            const search = (results) => {
                return results.filter((item) => {
                    keys.some((key) => item[key].toLowerCase().includes(query))
                })
            }

            return res.status(200).json(search(results))
        } else {
            return res.status(200).json(results)
        }
    })
}   

export const getDesktop = (req, res) => {
    const { desktop_id } = req.params

    const sql = "SELECT a.* FROM desktop a JOIN user_desktop b JOIN users c WHERE a.desktop_id = ? AND a.desktop_id = b.desktop_id AND c.user_id = b.user_id AND a.state = 'active' AND b.state = 'active'"
    const values = [ desktop_id ]

    db.query(sql, values, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." }) 
        }
        return res.status(200).json(results[0])
    })
}

export const postDesktop = (req, res) => {
    const { title, description } = req.body
    const { user_id } = req.params

    const createdDate = new Date()

    const sql = "INSERT INTO desktop (title, description, state, created) VALUES (?)"
    const values = [
        title,
        description,
        state,
        createdDate
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        const sql = "SELECT LAST_INSERT_ID(id) AS id FROM desktop ORDER BY id DESC LIMIT 1"

        db.query(sql, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            } else {
                const desktop_id = results[0].id
                console.log(desktop_id)

                const sql = "INSERT INTO user_desktop (user_id, desktop_id, permission_id, state, created) VALUES (?)"
                const values = [
                    user_id,
                    desktop_id,
                    '1',
                    state,
                    createdDate
                ]

                db.query(sql, [values], (error) => {
                    if (error) {
                        return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
                    }
                    return res.status(200).json(desktop_id)
                })
            } 
        })
    })
}

export const updateDesktop = (req, res) => {
    const { desktop_id } = req.params
    const { title, description } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE desktop SET title = ?, description = ?, updatedAt = ? WHERE desktop_id = ?"
    const values = [
        title, 
        description, 
        updatedDate, 
        desktop_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Área de trabalho atualizada com sucesso." })
    })
}

export const deleteDesktop = (req, res) => {
    const { desktop_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE desktop SET state = 'disabled', updatedAt = ? WHERE desktop_id = ?"
    const values = [
        updatedDate, 
        desktop_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Área de trabalho excluída com sucesso." })
    });
}