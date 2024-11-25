import adminModel from '../../models/adminModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await adminModel.findOne({ email })

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
     console.log(" admin password and input password 👍👍🚨🚨",admin.password,password);
     
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    res.cookie(process.env.JWT_SECRET_KEY,token)
    return res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error, please try again later' })
  }
}

export default adminLogin
