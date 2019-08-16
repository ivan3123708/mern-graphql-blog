const User = {
  posts(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).posts();
  },
  comments(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).comments();
  },
  following(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).following();
  },
  likes(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).likes();
  }
}

module.exports = User;