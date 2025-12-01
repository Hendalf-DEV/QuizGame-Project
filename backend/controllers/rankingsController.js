import express from 'express'
import { User } from '../models/userModel.js'

const rankingsRouter = express.Router()

rankingsRouter.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100

    const rankings = await User.find({})
      .sort({ score: -1 })
      .limit(limit)
      .select('username score')

    const rankingsWithPosition = rankings.map((user, index) => ({
      userId: user._id,
      username: user.username,
      score: user.score,
      rank: index + 1
    }))

    res.status(200).json(rankingsWithPosition)
  } catch (error) {
    console.error('Error fetching rankings:', error)
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

rankingsRouter.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const higherScoreCount = await User.countDocuments({ score: { $gt: user.score } })
    const rank = higherScoreCount + 1

    res.status(200).json({
      userId: user._id,
      username: user.username,
      score: user.score,
      rank
    })
  } catch (error) {
    console.error('Error fetching user rank:', error)
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

rankingsRouter.post('/score', async (req, res) => {
  try {
    const { userId, scoreToAdd } = req.body

    if (!userId || scoreToAdd === undefined) {
      return res.status(400).json({ message: 'userId and scoreToAdd are required' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.score += scoreToAdd
    await user.save()

    const higherScoreCount = await User.countDocuments({ score: { $gt: user.score } })
    const rank = higherScoreCount + 1

    res.status(200).json({
      userId: user._id,
      username: user.username,
      score: user.score,
      rank,
      message: 'Score updated successfully'
    })
  } catch (error) {
    console.error('Error updating score:', error)
    res.status(500).json({ message: 'Server error.', error: error.message })
  }
})

export default rankingsRouter

