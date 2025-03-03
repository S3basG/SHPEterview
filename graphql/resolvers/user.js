const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      const res = await newUser.save();
      return res;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return token;
    },
  },
};