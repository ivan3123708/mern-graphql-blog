import { gql } from 'apollo-boost';

export const GET_LATEST_POSTS = gql`
  query getLatestPosts {
    posts(orderBy: createdAt_DESC, first: 7) {
      title
      text
      category
      author {
        firstName
        lastName
      }
      likedBy {
        firstName
        lastName
      }
      likes
      createdAt
    }
  }
`;

export const GET_POPULAR_POSTS = gql`
  query getPopularPosts {
    posts(orderBy: likes_DESC, first: 4) {
      title
      category
      author {
        firstName
        lastName
      }
      likes
      createdAt
    }
  }
`;
