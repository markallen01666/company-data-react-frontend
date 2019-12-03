// Company Data App Frontend - React Offices page view component
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
    this.handleSubmitAddOfficeRecord = this.handleSubmitAddOfficeRecord.bind(
      this
    );
    this.handleCreateDocumentReset = this.handleCreateDocumentReset.bind(this);
  }

  // Retrieving documents from Office collection in database
  getOfficeData() {
    axios.get(this.props.officeDataURL).then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  // Adding new document to Office collection in database
  handleSubmitAddOfficeRecord(event) {
    event.preventDefault();
    let formData = {
      office: document.getElementById("office").value,
      building: document.getElementById("building").value,
      number: document.getElementById("number").value,
      street: document.getElementById("street").value,
      town: document.getElementById("town").value,
      postcode: document.getElementById("postcode").value,
      adminLock: document.getElementById("adminLock").value
    };
    let formMessage = document.getElementById("formMessage");
    axios
      .post(this.props.officeDataURL + "/add", formData)
      .then(response => {
        if (response.data.status === "Fail") {
          // 'Add' was rejected because Office name is not unique
          formMessage.className = "modal-error";
        } else {
          formMessage.className = "modal-success";    // Document added to database successfully
          document.getElementById("addOfficeButton").className += " btn-hide";
          let stateHolder = this.state.data;
          stateHolder.push(formData);
          this.setState({
            data: stateHolder   // Update current state with new record avoiding data reload
          });
        }
        formMessage.innerHTML = response.data.message; // Show success/fail message to user
      })
      .catch(error => {
        // Unexpected error occurred
        formMessage.className = "modal-error";
        formMessage.innerHTML =
          "An unexpected error occurred. Please contact the system administrator. Error:" +
          error;
      });
  }

  // Tidy up when 'create document' modal closes
  handleCreateDocumentReset() {
    document.getElementById("addOfficeRecordForm").reset();
    document.getElementById("formMessage").innerHTML = "";
    document.getElementById("formMessage").className = "";
    document.getElementById("addOfficeButton").className = "btn btn-primary";
  }

  componentDidMount() {
    this.getOfficeData();

    // Event handlers for modal forms
    document
      .getElementById("addOfficeRecordForm")
      .addEventListener("submit", this.handleSubmitAddOfficeRecord);
    document
      .getElementById("createDocumentCloseButton")
      .addEventListener("click", this.handleCreateDocumentReset); 

    // Inject card specific information into 'change' and 'delete' modals
    window.$("#deleteRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget);   // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title");   // Extract info from data-* attributes
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier);   // Update modal with record identifier
    });
    window.$("#updateRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget);   // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title");   // Extract info from data-* attributes
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier);   // Update modal with record identifier
    });
    window.$('[data-toggle="tooltip"]').tooltip();
  }
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }

  render() {
      // Default 'data loading' spinner
      let officeCards = (
      <div className="col-sm-12 text-center">
        <Loader
          type="Circles"
          color="#FFFFFF"
          height={150}
          width={150}
          timeout={0}   // Show until data loads
        />
      </div>
    );

    // Build cards when data recieved from DB
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
              <div className="card-text">{"adminLock: " + data.adminLock}</div>
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

    // Render view
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
          {/* Inject cards built from records read */}
          <div className="row padding-bottom-5vh">{officeCards}</div>
          <div className="row pb-1"></div>
        </div>

        {/* --------- Create modals (in-page popup boxes) --------- */}

        {/* 'Create record' modal */}
        <div
          className="modal fade"
          id="createRecordModal"
          tabIndex="-1"
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
              <div className="modal-body">
                {/* New record form */}
                <form id="addOfficeRecordForm">
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="office name"
                        id="office"
                        name="office"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Office names must be unique"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="building name"
                        id="building"
                        name="building"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="street number"
                        id="number"
                        name="number"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        placeholder="street name"
                        id="street"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="town"
                        placeholder="town/city name"
                        id="town"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="postcode"
                        placeholder="postcode"
                        id="postcode"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>adminLock?</label>
                      <select
                        name="adminLock"
                        id="adminLock"
                        className="form-control"
                        defaultValue="false"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Locked records can only be changed/deleted by the Administrator"
                      >
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>
                  {/* Success/error message */}
                  <div id="formMessage"></div>
                  <br />
                  <div className="form-group">
                    <button
                      type="submit"
                      value="submit"
                      className="btn btn-primary"
                      id="addOfficeButton"
                    >
                      Add office
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  id="createDocumentCloseButton"
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 'Update record' modal */}
        <div
          className="modal fade"
          id="updateRecordModal"
          tabIndex="-1"
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

        {/* 'Delete record' modal */}
        <div
          className="modal fade"
          id="deleteRecordModal"
          tabIndex="-1"
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
