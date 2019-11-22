// React Offices page content component
// M. Allen - 2019

import React, { Component } from "react";
import axios from "axios";

class Offices extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getOfficeData();
  }

  getOfficeData() {
    axios.get(this.props.officeDataURL).then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  render() {
    let officeCards = "";
    // Handle rendering before DB response received
    if (Object.keys(this.state.data).length > 0) {
      console.log(`B: ${this.state.data}`);
      officeCards = this.state.data.map((data) => (
        <div className="col-sm-4">
          <div className="card h-100 card-spacing">
            <div className="card-body">
              <h5 className="card-title">{data.office}</h5>
              <p className="card-text">
                Bespoke responsive websites and web applications written to your
                specifications. Hand coded using HTML5, CSS3, Javascript, React
                and Bootstrap.
              </p>
            </div>
          </div>
        </div>
      ));
    } else {
      console.log(`B: No data`);
    }
    return (
      <div className="App-body App-offices pb-5">
        <div className="container App-content">
          <div className="row justify-content-center padding-bottom-5vh">
            <div className="col-xs-12">
              <h2>Office records</h2>
            </div>
          </div>
          <div className="row padding-bottom-5vh">
            {officeCards}
          </div>
          <div className="row pb-1"></div>
        </div>
      </div>
    );
  }
}

export default Offices;
