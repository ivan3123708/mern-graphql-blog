const Post = {
  author(parent, args, { prisma }) {
    return prisma.post({ id: parent.id }).author();
  }
}

module.exports = Post;