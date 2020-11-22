import { gql } from "@apollo/client";

export const homepageQ = gql`
  query {
    posts {
      id
      title
      category
      date
      comment
    }
  }
`;
