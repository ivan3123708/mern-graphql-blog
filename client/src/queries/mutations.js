import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($data: LoginUserInput!) {
    login(data: $data) {
      user {
        id
        firstName
        lastName
      }
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        id
        firstName
        lastName
      }
      token
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      text
    }
  }
`;
