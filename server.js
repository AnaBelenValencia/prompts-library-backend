import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3001

const server =app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const gracefulShutdown = () => {
  console.log('\nSuccessfully shutting down...')
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed')
      process.exit(0)
    })
  })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)