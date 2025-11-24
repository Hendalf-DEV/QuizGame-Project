import mongoose from 'mongoose'
const { Schema } = mongoose

const QuestionSchema = new Schema({
  question: String,
  answers: [String],
  correctIndex: Number
})

export const questions = mongoose.models.question || mongoose.model('Question', QuestionSchema)