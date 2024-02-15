const jwt = require('jsonwebtoken');
const User=require('../Model/User');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); 

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};


const  checkAdminRole=async(req, res, next)=>{
  const user=await User.findOne({ email: req.body.email}).exec();
  console.log(user)
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}

module.exports= { authenticateToken,checkAdminRole};
