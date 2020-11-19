export declare namespace MyQuery {
  export type HomepageQuery = {
    posts: HomepagePost[];
  };

  export type HomepagePost = {
    title: string;
    category: string;
    author: string;
    date: string;
    id: string;
  };

  export type Gamer = string;
}
