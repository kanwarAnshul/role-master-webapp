import adminModel from '../../models/adminModel.js'
import bcrypt from 'bcrypt'

const createAdmin = async (req, res) => {
  const { adminName, email, password } = req.body

  try {
    let admin = await adminModel.findOne({ email })
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    const salt = await bcrypt.genSalt(10)

    const newAdmin = await adminModel.create({
      adminName,
      email,
      password,
    })

    return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin })
  } catch (error) {
    console.error('Error creating admin:', error)
    return res.status(500).json({ message: 'Server error, please try again later' })
  }
}

export default createAdmin
