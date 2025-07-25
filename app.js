import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import promptRoutes from './routes/prompts.js'

dotenv.config()

if (!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env')
  process.exit(1)
}

const app = express()

app.use(cors())

app.use(express.json())

app.use('/prompts', promptRoutes)

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: 'promptdb',
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log('MongoDB connection closed due to app termination')
    process.exit(0)
  })

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err)
})

export default app