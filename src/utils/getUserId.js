require('dotenv').config();
const jwt = require('jsonwebtoken');

const getUserId = async (token) => {
  if (!token) {
    return null;
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  return decoded.userId;
}

module.exports = getUserId;