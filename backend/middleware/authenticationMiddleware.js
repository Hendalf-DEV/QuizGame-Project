import logger from '../utils/loggerUtil.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization) {
    request.token = null
  } else if (authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

export const userExtractor = async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(request.token, JWT_SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = decodedToken.id
    next()
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }
}
