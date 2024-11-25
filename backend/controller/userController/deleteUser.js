import userModel from "../../models/userModel.js";
const deleteUser = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const user = await userModel.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'No such user found' });
      }
  
      await userModel.findByIdAndDelete(id);
      console.log("Deleted user:", user);
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  export default deleteUser