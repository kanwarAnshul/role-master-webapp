import userModel from '../../models/userModel.js'

const editUser = async (req, res) => {
  const { id } = req.params
  const { username, email, role, status } = req.body

  try {
    let user = await userModel.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'No such user found' })
    }

    user.username = username || user.username
    user.email = email || user.email
    user.role = role || user.role
    user.status = status || user.status
    await user.save()

    console.log('Updated user:', user)

    return res.status(200).json({ message: 'User updated successfully', user })
  } catch (error) {
    console.error('Error updating user:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export default editUser
