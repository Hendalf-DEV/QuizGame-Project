import express from 'express'
import mongoose from 'mongoose'
import logger from './utils/logger.js'
import { registerRoutes } from './routes/api.js'
import { MONGODB_URI, PORT } from './config/config.js'

const app = express()

if (mongoose.connection.readyState === 0) {
  mongoose.set('strictQuery', false)

  logger.info('Connecting to database...')
  // Optimize MongoDB connection for performance
  const mongooseOptions = {
    maxPoolSize: 10, // Maximum number of connections in the pool
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  }

  await mongoose.connect(MONGODB_URI, mongooseOptions).catch(
    (error) => { logger.error('Error connecting to database:', error.message) }
  )
  logger.info('Connected to database')
}

app.use(express.json())

registerRoutes(app)

app.use(express.static('dist'))


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

export default app