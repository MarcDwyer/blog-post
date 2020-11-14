import { v4 as uuidv4 } from "uuid";

export interface NewPost {
  title: string;
  body: string;
  author: string;
  id: string;
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
