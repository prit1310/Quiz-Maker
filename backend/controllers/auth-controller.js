const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome to the project' });
  } catch (error) {
    res.status(400).json({ msg: 'Page not found', error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreate = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    return res.status(201).json({
      message: 'Registration successful',
      token: await userCreate.generateToken(),
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist)
      return res.status(400).json({ message: 'Invalid Credentials' });

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

    if (isPasswordCorrect) {
      return res.status(200).json({
        message: 'Login successful',
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(400).json({ msg: 'Internal server error', error: error.message });
  }
};

module.exports = { home, register, login, user };
