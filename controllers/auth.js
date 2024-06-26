import { db } from '../server.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const state = 'active'

export const signup = (req, res) => {
    const { username, email, password } = req.body
    
    const sql = `SELECT * FROM users WHERE email = "${email}"`

    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (results.length) {
            return res.status(400).json({ error: "Email já cadastrado." })
        } 

        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(password, salt)

        const date = new Date()

        const sql = "INSERT INTO users (`email`, `password`, `username`, `state`, `createdAt`, `updatedAt`) VALUES (?)"
        const values = [
            email,
            hash,
            username,
            state,
            date,
            date
        ]

        db.query(sql, [values], (error, results) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ error: "Não foi possível realizar o cadastro." })
            }
            return res.status(200).json({ message: "Usuário cadastrado." })
        })
    })
}

export const signin = (req, res) => {
    const { email, password } = req.body

    const sql = "SELECT * FROM users WHERE email = ?"

    db.query(sql, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Houve um erro na conexão com o servidor." })
        }
        if (!results.length || results.length === 0) {
            return res.status(400).json({ error: "Email ou senha incorretos." })
        } else {
            const correctPassword = bcrypt.compareSync(password, results[0].password)

            if (!correctPassword) {
                return res.status(400).json({ error: "Email ou senha incorretos." })
            } else {
                const secretKey = process.env.SECRET_KEY
                var token = jwt.sign({ user_id: results[0].user_id }, secretKey)
                const { password, ...other } = results[0]

                res.cookie("token", token, {
                    httpOnly: true
                })
                return res.status(200).json(other)
            }
        }
    })
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        sameSite: "none",
        secure: true
    }).status(200).json({ message: "Usuário deslogado." })
}