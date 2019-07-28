const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const Mutation = {
  async login(parent, args, { prisma }) {
    const user = await prisma.user({ email: args.data.email });

    if (!user) {
      throw new Error('No user found.');
    }

    const isPassCorrect = await bcrypt.compare(args.data.password, user.password);

    if (!isPassCorrect) {
      throw new Error('Incorrect password.');
    }

    const token = generateToken(user.id);

    return { user, token };
  },
  async createUser(parent, args, { prisma }) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.');
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.createUser({
      name: args.data.name,
      email: args.data.email,
      password: password
    });

    const token = generateToken(user.id);

    return { user, token };
  }
}

module.exports = Mutation;