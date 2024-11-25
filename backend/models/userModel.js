import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Editor', 'Viewer'],
    default:"Viewer"
  },
})

export default mongoose.model('user', userModel)
