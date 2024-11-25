import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['SuperAdmin', 'Admin'],
      default: 'Admin',
    },
    permissions: {
      type: [String],
      default: ['Read'],
    },
  },
  {
    timestamps: true,
  },
)

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10) // Generate salt
    this.password = await bcrypt.hash(this.password, salt) // Hash the password
  }
  next()
})

adminSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model('Admin', adminSchema)
