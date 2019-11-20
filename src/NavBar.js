// React Navbar component
// M. Allen - 2019

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Navigation components
import HomePage from "./HomePage";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Reviews from "./Reviews";

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
              Mark Allen
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
                  <a className="nav-link" href="/about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/services">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/reviews">
                    Reviews
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/services" component={Services} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/reviews" component={Reviews} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default NavBar;
