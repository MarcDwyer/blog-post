import { ScanOutput } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

export interface NewPost {
  title: string;
  body: string;
  author: string;
  id: string;
  category: string;
}
export interface Post extends NewPost {
  date: Date;
}

export const createPost = (np: NewPost): Post => {
  return {
    ...np,
    id: uuidv4(),
    date: new Date(),
  };
};

// export const formatDynamo = (payload: ScanOutput.Items) => {
//   const result: Post[] = [];
//   console.log(payload);
//   for (const { post } of payload) {
//     result.push(JSON.parse(post));
//   }
//   return result;
// };
