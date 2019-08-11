import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($data: LoginUserInput!) {
    login(data: $data) {
      user {
        firstName
      }
      token
    }
  }
`;
