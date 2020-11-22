export declare namespace MyQuery {
  export type HomepageQuery = {
    posts: Post[];
  };

  export interface Post {
    title: string;
    category: string;
    date: string;
    id: string;
    comment: string;
  }
}
