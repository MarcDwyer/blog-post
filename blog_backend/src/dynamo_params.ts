import { GetItemInput, PutItemInput } from "@aws-sdk/client-dynamodb";
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
        CATEGORY: { S: post.category },
        post: { S: JSON.stringify(post) },
      },
    };
  }

  getPost(id: string): GetItemInput {
    return {
      TableName: this.tableName,
      Key: {
        KEY: { S: id },
      },
    };
  }
}

export default new DynamoParams();
