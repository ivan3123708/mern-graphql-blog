import { gql } from 'apollo-boost';

export const GET_LATEST_POSTS = gql`
  query getLatestPosts {
    posts(first: 7, orderBy: createdAt_DESC) {
      title
      text
      category
      author {
        firstName
        lastName
      }
      likes {
        firstName
        lastName
      }
      createdAt
    }
  }
`;
