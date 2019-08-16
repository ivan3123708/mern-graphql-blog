const Query = {
  user(parent, args, { prisma }) {
    return prisma.user({ email: args.email });
  },
  users(parent, args, { prisma }) {
    return prisma.users();
  },
  posts(parent, args, { prisma }) {
    return prisma.posts({ ...args });
  },
  comments(parent, args, { prisma }) {
    return prisma.comments();
  }
}

module.exports = Query;