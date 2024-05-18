const getProjects = (req, res) => {
    const { desktop_id } = req.params

    const query = "SELECT c.* FROM user_desktop a JOIN desktop b JOIN projects c WHERE b.desktop_id = ? AND c.state = 'active'"

    db.query(query, desktop_id, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json( results.data )
        }
    })
}

const getProject = (req, res) => {
    const { project_id } = req.params

    const query = "SELECT a.desktop_id, b.* FROM desktop a JOIN project b WHERE b.project_id = ? AND b.desktop_id = a.desktop_id AND b.state = 'active'"

    db.query(query, project_id, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro." })
        }
        if (results.length === 0 || !results.length) {
            return res.status(200).json({ message: "Nenhum resultado encontrado." })
        } else {
            return res.status(200).json( results.data )
        }
    })
}

const postProject = (req, res) => {
    const { desktop_id } = req.params
    const { title, description } = req.body

    const values = [
        desktop_id,
        title,
        description,
        state,
        date,
        null
    ]

    const query = "INSERT INTO projects (desktop_id, title, description, state, createdAt, updatedAt) AS (?)"

    db.query(query, [values], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Erro." })
        }
        const query = "SELECT LAST_INSERT_ID(desktop_id) AS id FROM desktop ORDER BY desktop_id DESC LIMIT 1"
        db.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Erro." })
            }
            return res.status(200).json( results.data )
        })
    })
}

const updateProject = (req, res) => {
    const { project_id } = req.params
    const { title, description } = req.body
}