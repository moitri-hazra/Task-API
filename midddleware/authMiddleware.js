const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Extracting JWT token from request headers
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extracting user ID from decoded token
    const userId = decodedToken.userId;

    // Attaching the user ID to the request object
    req.user = { id: userId };

    //route handler
    next();
  } catch (error) {

    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
