import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from './db/connectDB.js'
import userAuthRouter from './routes/userAuth.route.js'
import messAuthRouter from './routes/messAuth.route.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/user/auth", userAuthRouter)
app.use("/api/mess/auth", messAuthRouter)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`)
})

