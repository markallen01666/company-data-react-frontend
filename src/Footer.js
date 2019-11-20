// React Footer component
// M. Allen - 2019

import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="App-footer">
        <div className="container">
          <div className="row padding-top-5vh">
            <div className="col-sm text-sm-left">
              <p><strong>Mark Allen - Web Developer</strong></p>
              <p>
              <a
                  href="https://markallenwebdeveloper.co.uk"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fas fa-link"></i> markallenwebdeveloper.co.uk
                </a>
              </p>
            </div>
            <div className="col-sm text-sm-right">
              <p>
                <a
                  href="https://www.linkedin.com/in/markallenwebdeveloper"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/markallen01666"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-github-square"></i> GitHub
                </a>
              </p>
              <p>
                <a
                  href="https://stackoverflow.com/users/8069111/mark-allen"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-stack-overflow"></i> stack
                  <strong>overflow</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
