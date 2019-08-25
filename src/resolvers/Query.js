const Query = {
  user(parent, args, { prisma }) {
    return prisma.user({ email: args.email });
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