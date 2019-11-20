// React Home page content component
// M. Allen - 2019

import React, { Component } from "react";

class HomePage extends Component {
  render() {
    return (
      <div className="text-center App-body App-homepage">
        <div className="container-fluid App-content">
          <div className="row justify-content-center">
            <div className="col-xs-6">
              <h1>Freelance Web Developer</h1>
            </div>
          </div>
          <div className="row justify-content-center padding-top-5vh">
            <div className="col-xs-6">
              <img
                src="images/techs.png"
                className="img-fluid w-50"
                alt="Main skill icons"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
