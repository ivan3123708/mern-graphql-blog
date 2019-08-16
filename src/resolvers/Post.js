const Post = {
  author(parent, args, { prisma }) {
    return prisma.post({ id: parent.id }).author();
  },
  comments(parent, args, { prisma }) {
    return prisma.post({ id: parent.id }).comments();
  },
  likes(parent, args, { prisma }) {
    return prisma.post({ id: parent.id }).likes();
  }
}

module.exports = Post;