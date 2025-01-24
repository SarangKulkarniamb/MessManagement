import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db/connectDB.js'
import userAuthRouter from './routes/userAuth.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/auth", userAuthRouter)


app.listen(PORT, () => {
    console.log("connecting to database...")
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`)
})

