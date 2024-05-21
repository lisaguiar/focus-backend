import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import mysql from 'mysql2'

import authRoutes from './routes/auth.js'
import desktopRoutes from './routes/desktop.js'
import memberRoutes from './routes/member.js'
import validateRoutes from './routes/validate.js'

dotenv.config({ path: './config/.env' })

const app = express()
const server = createServer(app)

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

export const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

app.use('/auth', authRoutes)
app.use('/desktop', desktopRoutes)
app.use('/member', memberRoutes)
app.use('/validate', validateRoutes)


const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`Conectado na porta ${PORT}.`)
})