import { db } from "../server.js"

const state = 'active'

export const getProjects = (req, res) => {
    const { desktop_id } = req.params

    const query = "SELECT b.* FROM desktop a JOIN projects b WHERE a.desktop_id = ? AND b.state = 'active'"

    db.query(query, desktop_id, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json(results)
        }
    })
}

export const getProject = (req, res) => {
    const { project_id } = req.params

    const query = "SELECT a.desktop_id, b.* FROM desktop a JOIN project b WHERE b.project_id = ? AND b.desktop_id = a.desktop_id AND b.state = 'active'"

    db.query(query, project_id, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json(results)
        }
    })
}

export const postProject = (req, res) => {
    const { desktop_id } = req.params
    const { title, description } = req.body

    const createdDate = new Date()

    const values = [
        desktop_id,
        title,
        description,
        state,
        createdDate
    ]

    const query = "INSERT INTO projects (desktop_id, title, description, state, createdAt) VALUES (?)"

    db.query(query, [values], (error) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        
        const query = "SELECT LAST_INSERT_ID(project_id) AS id FROM projects ORDER BY project_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
            }
            return res.status(200).json(results)
        })
    })
}

export const updateProject = (req, res) => {
    const { project_id } = req.params
    const { title, description } = req.body

    const updatedDate = new Date()

    const sql = "UPDATE projects SET title = ?, description = ?, updatedAt = ? WHERE project_id = ?"
    const values = [
        title, 
        description, 
        updatedDate, 
        project_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Projeto atualizado com sucesso." })
    })
}

export const deleteProject = (req, res) => {
    const { project_id } = req.params

    const updatedDate = new Date()

    const sql = "UPDATE projects SET state = 'disabled', updatedAt = ? WHERE project_id = ?"
    const values = [
        updatedDate, 
        project_id
    ]

    db.query(sql, values, (error) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        return res.status(200).json({ message: "Projeto deletado com sucesso." })
    })
}