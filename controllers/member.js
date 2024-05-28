import { db } from "../server.js"

const state = 'active'

export const getMembers = (req, res) => {
    const { desktop_id } = req.params

    const query = "SELECT a.userdesktop_id, a.permission_id, a.createdAt, b.email FROM user_desktop a JOIN users b WHERE a.desktop_id = ? AND a.user_id = b.user_id AND a.state = 'active' AND b.state = 'active'"

    db.query(query, desktop_id, (error, results) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum membro encontrado." })
        } else {
            return res.status(200).json(results)
        }
    })
}

export const selectUser = (req, res) => {
    const { email } = req.body

    const query = "SELECT user_id FROM users WHERE email = ? AND state = 'active'"

    db.query(query, email, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum membro encontrado." })
        } else {
            return res.status(200).json(results)
        }
    })
}

export const postMember = (req, res) => {
    const { desktop_id } = req.params
    const { email, permission_id } = req.body

    const query = "SELECT user_id FROM users WHERE email = ? AND state = 'active'"
    db.query(query, email, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        } 
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum membro encontrado." })
        } else {
            const user_id = results
            const values = [
                user_id,
                desktop_id,
                permission_id,
                state,
                date
            ]

            const query = "INSERT INTO user_desktop (user_id, desktop_id, permission_id, state, createdAt) VALUES (?)"
            db.query(query, [values], (error) => {
                if (error) {
                    return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
                }
                return res.status(200).json({ message: "Membro adicionado à área de trabalho." })
            })
        }
    })
}

export const updateMember = (req, res) => {
    const { userdesktop_id } = req.params
    const { permission_id } = req.body

    const values = [
        permission_id,
        userdesktop_id
    ]

    const query = "UPDATE user_desktop SET permission_id = ? WHERE userdesktop_id = ?"
    db.query(query, [values], (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Permissão atualizada." })
    })
}

export const deleteMember = (req, res) => {
    const { userdesktop_id } = req.params

    const query = "UPDATE user_desktop SET state = 'disabled' WHERE userdesktop_id = ?"
    db.query(query, userdesktop_id, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Membro excluído da área de trabalho." })
    })
}