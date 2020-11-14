import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ApolloServer, gql } from "apollo-server";

import DParams from "./dynamo_params";
import { createPost, NewPost, Post } from "./posts";

const region = "us-east-2";

const typeDefs = gql`
  scalar Date

  type Post {
    title: String
    author: String
    body: String
    date: Date
  }
  input NewPost {
    title: String
    author: String
    body: String
  }
  type Query {
    posts: [Post]
  }
  type Mutation {
    addPost(title: String!, body: String!, author: String!): Post
  }
`;
async function main() {
  const dbClient = new DynamoDBClient({ region });
  console.log(dbClient);
  const resolvers = {
    Query: {
      posts: async () => {
        const data = await dbClient.send(new ScanCommand(DParams.allPosts));
        console.log(data);
        return data.Items;
      },
    },
    Mutation: {
      addPost: async (parent: any, np: NewPost, context: any, info: any) => {
        const post = createPost(np);
        const res = await dbClient.send(
          new PutItemCommand(DParams.addPost(post))
        );
        console.log(res);
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
