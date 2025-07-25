import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import promptRoutes from './routes/prompts.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: 'promptdb',
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err))

app.use('/prompts', promptRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
