import React from "react";
import { Link } from "react-router-dom";

import "./nav.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="logo" to="/">
        My Blog
      </Link>
    </div>
  );
}
