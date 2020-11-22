import { gql } from "@apollo/client";

export const FIND_POST = gql`
  query FindPost($id: String!) {
    post(id: $id) {
      id
      title
      comment
      body
    }
  }
`;
