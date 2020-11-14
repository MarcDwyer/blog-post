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
        id: { N: "1" },
        post: { S: JSON.stringify(post) },
      },
    };
  }
}

export default new DynamoParams();
