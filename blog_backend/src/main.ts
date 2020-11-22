import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { ApolloServer, gql } from "apollo-server";

import DParams from "./dynamo_params";
import { createPost, NewPost, Post } from "./posts";

const region = "us-east-2";

const typeDefs = gql`
  scalar Date

  type Post {
    id: String!
    title: String!
    body: String!
    date: Date!
    category: String!
    comment: String!
  }
  input NewPost {
    title: String!
    body: String!
    category: String!
    comment: String!
  }
  type Query {
    posts: [Post!]
    post(id: String!): Post!
  }
  type Mutation {
    addPost(
      title: String!
      body: String!
      category: String!
      comment: String!
    ): Post!
  }
`;
async function main() {
  const dbClient = new DynamoDBClient({ region });
  const resolvers = {
    Query: {
      posts: async () => {
        const data = await dbClient.send(new ScanCommand(DParams.allPosts));
        const dPosts: Post[] = [];
        data.Items?.forEach(function (element, index, array) {
          const post = element["post"]["S"];
          if (post) {
            dPosts.push(JSON.parse(post));
            return;
          }
          console.error(`post not found`);
        });
        return dPosts;
      },
      post: async (parent: any, payload: any, context: any, info: any) => {
        const { id } = payload;
        const params = DParams.getPost(id);
        const data = await dbClient.send(new GetItemCommand(params));
        if (!data.Item) throw "no post found";
        const post = data.Item["post"]["S"];
        if (!post) throw "Could not parse post";
        return JSON.parse(post);
      },
    },
    Mutation: {
      addPost: async (parent: any, np: NewPost, context: any, info: any) => {
        const post = createPost(np);
        await dbClient.send(new PutItemCommand(DParams.addPost(post)));
        return post;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
