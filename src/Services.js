// React Services page content component
// M. Allen - 2019

import React, { Component } from "react";

class Services extends Component {
  render() {
    return (
      <div className="App-body App-services pb-5">
        <div className="container App-content">
          <div className="row pb-1">
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-code card-icon-1"></i> Hand-crafted web apps</h5>
                  <p className="card-text">
                    Bespoke responsive websites and web applications written to
                    your specifications. Hand coded using HTML5, CSS3,
                    Javascript, React and Bootstrap.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-file-alt card-icon-2"></i> Template based websites</h5>
                  <p className="card-text">
                    Professional modern websites developed using Bootstrap
                    templates, modified and enhanced to meet your needs. Choose
                    from hundreds of themes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fab fa-wordpress card-icon-3"></i> Wordpress websites</h5>
                  <p className="card-text">
                    Professional websites created using Wordpress.org templates.
                    Choose from hundreds of free and chargeable commercial
                    themes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-users card-icon-4"></i> Remote team member</h5>
                  <p className="card-text">
                    Hire me to be a remote working member of your development
                    team. Short or long-term, part-time or full-time. Get in
                    touch to discuss your requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-headset card-icon-1"></i> Technical support</h5>
                  <p className="card-text">
                    With many years experience of installing and supporting
                    software, I can help you solve technical problems and
                    provide ongoing support.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-pen card-icon-2"></i> Documentation</h5>
                  <p className="card-text">
                    Clear documentation cuts support costs, improves the user
                    experience, and increases customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-feather-alt card-icon-3"></i> Bespoke web content</h5>
                  <p className="card-text">
                    Professional bespoke web content written to enhance your web
                    presence and communicate your key messages to your
                    customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-pound-sign card-icon-4"></i> Low-cost websites</h5>
                  <p className="card-text">
                    Budget websites for micro-businesses, charities and
                    community groups, created and hosted using the Weebly or Wix
                    website builders.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-wrench card-icon-1"></i> Changes, updates &amp; fixes</h5>
                  <p className="card-text">
                    Changes to existing web content, updates to site layout,
                    changes to functionality, adding new features, and fixing
                    problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-poll-h card-icon-2"></i> Questback / Unipark EFS</h5>
                  <p className="card-text">
                    Custom HTML, CSS, and Javascript for Questback / Unipark EFS
                    questions including type 911 user-defined questions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fab fa-linux card-icon-3"></i> Linux administration</h5>
                  <p className="card-text">
                    Linux systems administration, installation, configuration,
                    performance monitoring, capacity planning, and problem
                    solving.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-balance-scale-right card-icon-4"></i> Software evaluation</h5>
                  <p className="card-text">
                    Researching and reviewing available software packages and
                    technologies to identify the best solution to meet your
                    business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Services;
