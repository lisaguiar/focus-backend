import { db } from '../server.js'

export const getUsers = (req, res) => {
    const query = 'SELECT * FROM use_users'

    db.query(query, (error, results) => {
        if (error) {
            return res.json({ error: 'houve um erro.' })
        } else {
            return res.status(200).json({ results })
        }
    })
}