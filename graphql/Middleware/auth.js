const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Ensure SECRET_KEY is exported from your config


module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Expect header in format: "Bearer <token>"
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error('Invalid or expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer <token>'");
  }
  throw new Error('Authorization header not provided');
};
