import { PutItemInput } from "@aws-sdk/client-dynamodb";
import { Post } from "./posts";

class DynamoParams {
  private tableName: string = "posts";

  allPosts = {
    TableName: this.tableName,
  };

  addPost(post: Post): PutItemInput {
    return {
      TableName: this.tableName,
      Item: {
        KEY: { S: post.id },
        DATE: { S: JSON.stringify(post.date.getTime()) },
        post: { S: JSON.stringify(post) },
      },
      ReturnValues: "ALL_OLD",
    };
  }
}

export default new DynamoParams();
