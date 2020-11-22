import React from "react";

import { Theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./pages/HomePage/homepage";
import AddPost from "./pages/AddPost/addpost";

import Navbar from "./components/Navbar/nav";

import "./App.scss";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: Theme.bgColor, color: Theme.color }}
    >
      <div className="body">
        <Router>
          <Navbar />
          <div className="inner-body">
            <Switch>
              <Route path="/addpost" component={AddPost} />
              <Route path="/" component={Homepage} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
