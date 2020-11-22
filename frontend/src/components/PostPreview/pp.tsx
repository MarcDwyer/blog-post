import React from "react";
import { MyQuery } from "../../data_types";

import "./post.scss";

type Props = {
  post: MyQuery.Post;
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function PostPreview(p: Props) {
  const { post } = p;
  const created = new Date(post.date);
  console.log(p);
  const dateStr = `${
    monthNames[created.getMonth() - 1]
  } ${created.getDay()}, ${created.getFullYear()}`;

  return (
    <div className="post">
      <span className="title">{post.title}</span>
      <span className="date">{dateStr}</span>
    </div>
  );
}
