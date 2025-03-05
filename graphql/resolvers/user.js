const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');


/*finds all of the user docs in the User collection
returns an array of user objects
register and login are mutations that allow users to register and login
register hashes the password before saving it to the database
login checks if the user exists and if the password is correct
if the user exists and the password is correct, it returns a jwt token
if the user does not exist, it throws an error
if the password is incorrect, it throws an error
if there are any other errors, it throws an error
*/
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