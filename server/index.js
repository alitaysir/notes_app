import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import dotenv from 'dotenv';
dotenv.config();

import authrouter from './routes/auth.js'
import noterouter from './routes/note.js'

const app=express()
app.use(cors())
app.use(express.json())


app.use('/api/auth',authrouter)
app.use('/api/note',noterouter)

const PORT=5000


app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running at ${PORT}`)
})