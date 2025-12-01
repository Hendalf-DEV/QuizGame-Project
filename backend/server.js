import express from 'express'
import mongoose from 'mongoose'
import logger from './utils/loggerUtil.js'
import { registerRoutes } from './routes/apiRoute.js'
import { MONGODB_URI, PORT } from './config/config.js'

const app = express()

if (mongoose.connection.readyState === 0) {
  mongoose.set('strictQuery', false)

  logger.info('Connecting to database...')

  const mongooseOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
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