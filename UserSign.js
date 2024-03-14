require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const userId = '65f149d33a55a98c5bfa23fa'; 

const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('JWT Token:', token);
