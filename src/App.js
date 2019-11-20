// Mark Allen - web developer - Home page
// M. Allen - 2019

import React, { Component } from "react";
import "./App.css";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Footer />
      </div>
    );
  }
}

export default App;
