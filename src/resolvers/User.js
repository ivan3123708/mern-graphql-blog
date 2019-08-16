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
  likedPosts(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).likedPosts();
  }
}

module.exports = User;