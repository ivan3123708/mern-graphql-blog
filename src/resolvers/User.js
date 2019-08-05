const User = {
  posts(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).posts();
  },
  comments(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).comments();
  }
}

module.exports = User;