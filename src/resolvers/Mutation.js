const bcrypt = require('bcryptjs');
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
  },
  async createPost(parent, args, { userId, prisma }) {
    const post = await prisma.createPost({
      title: args.data.title,
      text: args.data.text,
      author: {
        connect: {
          id: userId
        }
      }
    });

    return post;
  },
  async deletePost(parent, args, { prisma }) {
    const post = await prisma.deletePost({
        id: args.id
    });

    return post;
  }
}

module.exports = Mutation;