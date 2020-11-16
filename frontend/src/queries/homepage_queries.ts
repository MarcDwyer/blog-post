import { gql } from "@apollo/client";

export const homepageQ = gql`
  query {
    posts {
      title
      category
      author
      date
    }
  }
`;
