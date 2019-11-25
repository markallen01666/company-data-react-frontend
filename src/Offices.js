// React Offices page content component
// M. Allen - 2019

import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

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
    let officeCards = (
      // Default data loading spinner
      <div className="col-sm-12 text-center">
        <Loader
          type="Circles"
          color="#FFFFFF"
          height={150}
          width={150}
          timeout={0} // Show until data loads
        />
      </div>
    );

    // Handle rendering before DB response received
    if (Object.keys(this.state.data).length > 0) {
      officeCards = this.state.data.map(data => (
        <div className="col-sm-4" key={data.office}>
          <div className="card card-spacing">
            <div className="card-body">
              <h5 className="card-title">{data.office}</h5>
              <div className="card-text">
                {"Building: " +
                  (data.building.length > 0 ? data.building : "---")}
              </div>
              <div className="card-text">
                {"Number: " + (data.number.length > 0 ? data.number : "---")}
              </div>
              <div className="card-text">
                {"Street: " + (data.street.length > 0 ? data.street : "---")}
              </div>
              <div className="card-text">{"City: " + data.town}</div>
              <div className="card-text">{"Postcode: " + data.postcode}</div>
            </div>
            <div className="row justify-content-center">
              <div className="">
                <button type="button" className="btn btn-update btn-circle">
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-delete btn-circle">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="App-body App-offices pb-5">
        <div className="container App-content">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 text-center">
              <h2>Office records</h2>
            </div>
            <div className="col-sm-2 text-right">
              <button type="button" className="btn btn-create btn-circle">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="row padding-bottom-5vh">{officeCards}</div>
          <div className="row pb-1"></div>
        </div>
      </div>
    );
  }
}

export default Offices;
