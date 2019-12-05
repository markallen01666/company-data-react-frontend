// Mark Allen - web developer - Company Data App Frontend - React Home page
// M. Allen - 2019

import React, { Component } from "react";
import "./App.css";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";

// Backend URL
//const backendURL = "https://company-data-node-backend.herokuapp.com"; // Node server host
const backendURL = "http://localhost:4000"; // local test address

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
