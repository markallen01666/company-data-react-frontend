// Mark Allen - web developer - Home page
// M. Allen - 2019

import React, { Component } from "react";
import "./App.css";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";

// Backend URL
const backendURL = "https://company-data-node-backend.herokuapp.com";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar backendURL={backendURL} />
        <Footer />
      </div>
    );
  }
}

export default App;
