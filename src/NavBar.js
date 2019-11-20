// React Navbar component
// M. Allen - 2019

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Navigation components
import HomePage from "./HomePage";
import Staff from "./Staff";
import Offices from "./Offices";
import About from "./About";


class NavBar extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
          id="mainNav"
        >
          <div className="container">
            <a className="navbar-brand" href="/">
              Company123uk
            </a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/staff">
                    Staff
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/offices">
                    Offices
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/staff" component={Staff} />
          <Route path="/offices" component={Offices} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default NavBar;
