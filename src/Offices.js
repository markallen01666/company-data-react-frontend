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
    window.$('[data-toggle="tooltip"]').tooltip();
    window.$("#deleteRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title"); // Extract info from data-* attributes
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier); // Update modal with record identifier
    });
    window.$("#updateRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title"); // Extract info from data-* attributes
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier); // Update modal with record identifier
    });
  }
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
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

    // Build cards to display when data recieved from DB
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
              <span
                data-toggle="modal"
                data-target="#updateRecordModal"
                data-record-title={data.office}
              >
                <button
                  type="button"
                  className="btn btn-update btn-circle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit record"
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </span>
              <span
                data-toggle="modal"
                data-target="#deleteRecordModal"
                data-record-title={data.office}
              >
                <button
                  type="button"
                  className="btn btn-delete btn-circle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete record"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </span>
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
              <span data-toggle="modal" data-target="#createRecordModal">
                <button
                  type="button"
                  className="btn btn-create btn-circle"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Create a new record"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </span>
            </div>
          </div>
          {/* Inject cards built form records read */}
          <div className="row padding-bottom-5vh">{officeCards}</div>
          <div className="row pb-1"></div>
        </div>
        {/* Create record modal */}
        <div
          className="modal fade"
          id="createRecordModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="createRecordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createRecordModalLabel">
                  Create a new Office record
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Enter your data here</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Update record modal */}
        <div
          className="modal fade"
          id="updateRecordModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="updateRecordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateRecordModalLabel">
                  Edit Office record
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <strong>
                  <h6 className="modal-record-title text-primary">Office</h6>
                </strong>
                <p>Enter your data here</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete record modal */}
        <div
          className="modal fade"
          id="deleteRecordModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleterecordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-danger"
                  id="deleteRecordModalLabel"
                >
                  Delete record
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <strong>
                  <h6 className="modal-record-title text-primary">Office</h6>
                </strong>
                <p>
                  You are about to delete this record. If you continue, this
                  information will be permanently deleted and cannot be
                  recovered.
                </p>
                <h6 className="text-danger">
                  Are you sure you want to continue?
                </h6>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger">
                  Delete record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Offices;
