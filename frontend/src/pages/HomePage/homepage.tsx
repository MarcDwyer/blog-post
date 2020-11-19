import React from "react";
import { useQuery } from "@apollo/client";
import { homepageQ } from "../../queries/homepage_queries";
import { MyQuery } from "../../data_types";

import PostPreview from "../../components/PostPreview/pp";

import "./homepage.scss";

export default function Homepage() {
  const { data, loading, error } = useQuery<MyQuery.HomepageQuery>(homepageQ);

  return (
    <div className="posts">
      {loading && <span>Loading posts...</span>}
      {data &&
        data.posts.map((post, i) => {
          return <PostPreview post={post} key={i} />;
        })}
    </div>
  );
}
