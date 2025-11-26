import mongoose from 'mongoose'
const { Schema } = mongoose

const QuestionSchema = new Schema({
  question: String,
  options: [String],
  correctIndex: Number
})

export const question = mongoose.models.question || mongoose.model('Question', QuestionSchema)