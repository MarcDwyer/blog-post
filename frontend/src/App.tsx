import { useQuery } from "@apollo/client";
import React from "react";

import "./App.scss";
import { homepageQ } from "./queries/homepage_queries";
import { Theme } from "./theme";

type HomepagePost = {
  title: string;
  category: string;
  author: string;
  date: string;
};
interface HomePageData {
  posts: HomepagePost[];
}

function App() {
  const { data, loading, error } = useQuery<HomePageData>(homepageQ);
  return (
    <div
      className="App"
      style={{ backgroundColor: Theme.bgColor, color: Theme.color }}
    >
      <div className="posts">
        {data &&
          data.posts.map((post, i) => {
            return (
              <div className="post" key={i}>
                <span>{post.title}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
