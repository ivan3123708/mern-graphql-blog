const Query = {
  users(parent, args, { prisma }) {
    return prisma.users();
  },
  posts(parent, args, { prisma }) {
    return prisma.posts();
  }
}

module.exports = Query;