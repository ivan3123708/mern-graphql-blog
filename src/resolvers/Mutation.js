const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const Mutation = {
  async login(parent, args, { prisma }) {
    const user = await prisma.user({ email: args.data.email });

    if (!user) {
      throw new Error('No user found.');
    }

    const isPassCorrect = await bcrypt.compare(args.data.password, user.password);

    if (!isPassCorrect) {
      throw new Error('Incorrect password.');
    }

    const token = generateToken(user.id);

    return { user, token };
  },
  async createUser(parent, args, { prisma }) {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 characters or longer.');
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.createUser({
      firstName: args.data.firstName,
      lastName: args.data.lastName,
      email: args.data.email,
      password: password
    });

    const token = generateToken(user.id);

    return { user, token };
  },
  async updateUser(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const user = await prisma.updateUser({
      data: { ...args.data },
      where: {
        id: userId
      }
    });

    return user;
  },
  async followUser(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    let user;
    const following = await prisma.user({ id: userId }).following();
    const action = following.find((user) => user.id === args.id) ? 'UNFOLLOW' : 'FOLLOW';

    if (action === 'FOLLOW') {
      user = await prisma.updateUser({
        data: {
          following: {
            connect: {
              id: args.id
            }
          }
        },
        where: {
          id: userId
        }
      });

      await prisma.updateUser({
        data: {
          followers: {
            connect: {
              id: userId
            }
          }
        },
        where: {
          id: args.id
        }
      });
    } else if (action === 'UNFOLLOW') {
      user = await prisma.updateUser({
        data: {
          following: {
            disconnect: {
              id: args.id
            }
          }
        },
        where: {
          id: userId
        }
      });

      await prisma.updateUser({
        data: {
          followers: {
            disconnect: {
              id: userId
            }
          }
        },
        where: {
          id: args.id
        }
      });
    }

    return user;
  },
  async deleteUser(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const user = await prisma.deleteUser({
      id: userId
    });

    return user;
  },
  async createPost(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const post = await prisma.createPost({
      title: args.data.title,
      text: args.data.text,
      category: args.data.category,
      author: {
        connect: {
          id: userId
        }
      }
    });

    return post;
  },
  async updatePost(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const postAuthor = await prisma.post({ id: args.id }).author();

    if (postAuthor.id !== userId) {
      throw new Error('You can edit only your posts');
    }

    const post = await prisma.updatePost({
      data: { ...args.data },
      where: {
        id: args.id
      }
    });

    return post;
  },
  async likePost(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    let post;
    const likedBy = await prisma.post({ id: args.id }).likedBy();
    const likes = await prisma.post({ id: args.id }).likes();
    const action = likedBy.find((user) => user.id === userId) ? 'UNLIKE' : 'LIKE';

    if (action === 'LIKE') {
      post = await prisma.updatePost({
        data: {
          likes: likes + 1,
          likedBy: {
            connect: {
              id: userId
            }
          }
        },
        where: {
          id: args.id
        }
      });

      await prisma.updateUser({
        data: {
          likedPosts: {
            connect: {
              id: args.id
            }
          }
        },
        where: {
          id: userId
        }
      });
    } else if (action === 'UNLIKE') {
      post = await prisma.updatePost({
        data: {
          likes: likes - 1,
          likedBy: {
            disconnect: {
              id: userId
            }
          }
        },
        where: {
          id: args.id
        }
      });

      await prisma.updateUser({
        data: {
          likedPosts: {
            disconnect: {
              id: args.id
            }
          }
        },
        where: {
          id: userId
        }
      });
    }

    return post;
  },
  async deletePost(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const postAuthor = await prisma.post({ id: args.id }).author();

    if (postAuthor.id !== userId) {
      throw new Error('You can delete only your posts');
    }

    const post = await prisma.deletePost({
        id: args.id
    });

    return post;
  },
  async createComment(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const comment = await prisma.createComment({
      text: args.data.text,
      author: {
        connect: {
          id: userId
        }
      },
      post: {
        connect: {
          id: args.data.post
        }
      }
    });

    return comment;
  },
  async updateComment(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const commentAuthor = await prisma.comment({ id: args.id }).author();

    if (commentAuthor.id !== userId) {
      throw new Error('You can edit only your comments');
    }

    const comment = prisma.updateComment({
      data: { ...args.data },
      where: {
        id: args.id
      }
    });

    return comment;
  },
  async deleteComment(parent, args, { userId, prisma }) {
    if (!userId) {
      throw new Error('You must be logged in');
    }

    const commentAuthor = await prisma.comment({ id: args.id }).author();

    if (commentAuthor.id !== userId) {
      throw new Error('You can delete only your comments');
    }

    const comment = await prisma.deleteComment({
      id: args.id
    });

    return comment;
  }
}

module.exports = Mutation;