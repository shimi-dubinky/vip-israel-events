const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');

/**
 * @desc    אימות משתמש וקבלת טוקן
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        _id: user._id,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
 
    console.error('ERROR IN authUser:', error); 

    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { authUser };