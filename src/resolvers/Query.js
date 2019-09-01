const Query = {
  user(parent, args, { userId, prisma }) {
    return prisma.user({ id: userId });
  },
  users(parent, args, { prisma }) {
    return prisma.users();
  },
  post(parent, args, { prisma }) {
    return prisma.post({ id: args.id });
  },
  posts(parent, args, { prisma }) {
    return prisma.posts({ ...args });
  },
  comments(parent, args, { prisma }) {
    return prisma.comments();
  }
}

module.exports = Query;