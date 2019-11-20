// React Home page content component
// M. Allen - 2019

import React, { Component } from "react";

class HomePage extends Component {
  render() {
    return (
      <div className="text-center App-body App-homepage">
        <div className="container App-content">
          <div className="row justify-content-center col123-headline">
            <div className="col-xs-6">
              <h1>Company data interface</h1>
            </div>
          </div>
          <div className="row justify-content-center padding-top-5vh">
            <div className="col-xs-6">
              <p>
                This is the Company123uk central database interface tool. It is
                connected to our central records for employees and regional
                offices. This tool allows you to read current data, add new
                records, make changes, and delete records from the company
                database.
              </p>
              <p>
                Please select the appropriate category from the menu at the top
                of this page to examine or modify staff or office data.
              </p>
            </div>
          </div>
          <div className="row justify-content-center co123-warning padding-top-5vh">
            <div className="col-xs-6">
              <h5>
                This tool is only for use by authorised employees of
                Company123uk.
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
