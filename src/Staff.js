// React Staff page content component
// M. Allen - 2019

import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

class Services extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getEmployeeData();
  }

  getEmployeeData() {
    axios.get(this.props.employeeDataURL).then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  render() {
    let employeeCards = (
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
      employeeCards = this.state.data.map(data => (
        <div className="col-sm-4" key={data.office}>
          <div className="card card-spacing">
            <div className="card-body">
              <h5 className="card-title">
                {data.firstName + " " + data.lastName}
              </h5>
              <div className="card-text">{"Position: " + data.position}</div>
              <div className="card-text">{"Office: " + data.office}</div>
              <div className="card-text">{"ID: " + data.staffId}</div>
              <div className="card-text">{"Telephone: " + data.telephone}</div>
              <div className="card-text">{"Email: " + data.email}</div>
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
      <div className="App-body App-staff pb-5">
        <div className="container App-content">
          <div className="row">
          <div className="col-sm-2"></div>
            <div className="col-sm-8 text-center">
              <h2>Employee records</h2>
            </div>
            <div className="col-sm-2 text-right">
              <button type="button" className="btn btn-create btn-circle">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="row padding-bottom-5vh">{employeeCards}</div>
          <div className="row pb-1"></div>
        </div>
      </div>
    );
  }
}

export default Services;
