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
  followers(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).followers();
  },
  likedPosts(parent, args, { prisma }) {
    return prisma.user({ id: parent.id }).likedPosts();
  }
}

module.exports = User;