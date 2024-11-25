import userModel from '../../models/userModel.js'

const userCreate = async (req, res) => {
  const { username, email,role,status } = req.body

  if (!username || !email) {
    return res.status(400).json({ message: 'Please fill in all required fields.' })
  }

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' })
    }

    const newUser = await userModel.create({ username, email,role,status })
    await newUser.save()
    res.status(201).json({ message: 'User created successfully.', user: newUser })
  } catch (error) {
    console.error('Error creating user:', error.message)
    res.status(500).json({ message: 'Internal Server Error.' })
  }
}

export default userCreate
