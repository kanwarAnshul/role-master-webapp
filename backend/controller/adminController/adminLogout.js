const adminLogout = (req, res) => {
    try {
      res.cookie(process.env.JWT_SECRET_KEY, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        expires: new Date(0), 
      });
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  };
  
  export default adminLogout;
  