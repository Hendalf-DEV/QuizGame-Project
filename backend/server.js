import express from 'express'
import mongoose from 'mongoose'
import logger from './modules/logger/logger.js'
import signupRouter from './controllers/signup.controller.js'
import userRouter from './controllers/user.controller.js'
import { MONGODB_URI, PORT } from './modules/utils/config/config.js'

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

// Delete data in DB users for testing purposes
await mongoose.connection.db.dropCollection('users' )

app.use(express.json())

app.use('/api/signup', signupRouter)
app.use('/api/users', userRouter)

app.use(express.static('dist'))


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

export default app