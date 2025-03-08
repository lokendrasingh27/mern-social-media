const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


  const { username, email, password, bio, profilePicture } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(user)

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      profilePicture,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.loginUser = async (req, res) => {
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {email, password} = req.body;
  console.log(req.body)
  
  try{
    let user=await User.find({email})
    if(!user) return res.status(400).json({message:'Invalid credentials'});

    const hashedPassword = user.password;
    console.log("Hashed Password:", hashedPassword);

    
    console.log(user)

    const isMatch=bcrypt.compare(password,user.password)
  if(!isMatch) return res.status(400).json({message:'Invalid credentials'});

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, userId: user._id, username: user.username });
  } catch(error){
    res.status(500).json({ message: 'Server error', error }); 
 }

};
