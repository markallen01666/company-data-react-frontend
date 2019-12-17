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
    this.handleSubmitUpdateOfficeRecord = this.handleSubmitUpdateOfficeRecord.bind(
      this
    );
    this.handleDeleteOfficeRecord = this.handleDeleteOfficeRecord.bind(this);
  }

  // Retrieving documents from Office collection in database
  getOfficeData() {
    axios.get(this.props.officeDataURL).then(res => {
      this.setState({
        data: this.sortData(res.data)
      });
    });
  }

  // Sort data before presentation to user
  sortData(data) {
    // Use office name to give sorted array
    let dataSortedByOffice = data.sort((a, b) =>
      a.office.localeCompare(b.office)
    ); // array sorted by office name
    return dataSortedByOffice;
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
          formMessage.className = "modal-success"; // Document added to database successfully
          document.getElementById("addOfficeButton").className += " hide";
          let stateHolder = this.state.data;
          stateHolder.push(formData);
          this.setState({
            data: this.sortData(stateHolder) // Update current state with new record avoiding data reload
          });
        }
        formMessage.innerHTML = response.data.message; // Show success/fail message to user
      })
      .catch(error => {
        // Unexpected error occurred
        formMessage.className = "modal-error";
        formMessage.innerHTML =
          "An unexpected error occurred. Please contact the system administrator. \nError = " +
          error;
      });
  }

  // Updating Office document collection in database
  handleSubmitUpdateOfficeRecord(event) {
    event.preventDefault();
    let formData = {
      office: document.getElementById("modal-update-office").value,
      building: document.getElementById("modal-update-building").value,
      number: document.getElementById("modal-update-number").value,
      street: document.getElementById("modal-update-street").value,
      town: document.getElementById("modal-update-town").value,
      postcode: document.getElementById("modal-update-postcode").value,
      adminLock: document.getElementById("modal-update-adminLock").value
    };
    let formMessage = document.getElementById("updateformMessage");
    axios
      .post(this.props.officeDataURL + "/update", formData)
      .then(response => {
        formMessage.className = "modal-success"; // Document updated successfully
        document.getElementById("updateOfficeButton").className += " hide";
        // Replace record info in state.data with updated version
        let stateHolder = this.state.data;
        let updateIndex = stateHolder.findIndex(
          sh => sh.office === formData.office
        );
        formData._id = stateHolder[updateIndex]._id;
        if (updateIndex !== -1) {
          stateHolder[updateIndex] = formData;
        }
        this.setState({
          data: this.sortData(stateHolder) // Update current state with modified record avoiding data reload
        });
        formMessage.innerHTML = "Update completed"; // Show success/fail message to user
      })
      .catch(error => {
        // Unexpected error occurred
        formMessage.className = "modal-error";
        formMessage.innerHTML =
          "An unexpected error occurred. Please contact the system administrator. \nError = " +
          error;
      });
  }

  // Delete office record
  handleDeleteOfficeRecord(event) {
    event.preventDefault();
    let formData = {
      office: document.getElementById("delete-office-name").innerHTML
    };
    let formMessage = document.getElementById("deleteformMessage");
    axios
      .post(this.props.officeDataURL + "/delete", formData)
      .then(response => {
        formMessage.className = "modal-success"; // Document deleted successfully
        document.getElementById("deleteOfficeButton").className += " hide";
        // Remove record info from state.data
        let stateHolder = this.state.data;
        let updateIndex = stateHolder.findIndex(
          sh => sh.office === formData.office
        );
        if (updateIndex !== -1) {
          stateHolder.splice(updateIndex, 1);
        }
        this.setState({
          data: this.sortData(stateHolder) // Update current state with modified state avoiding data reload
        });
        formMessage.innerHTML = "Delete completed"; // Show success/fail message to user
      })
      .catch(error => {
        // Unexpected error occurred
        formMessage.className = "modal-error";
        formMessage.innerHTML =
          "An unexpected error occurred. Please contact the system administrator. \nError = " +
          error;
      });
  }

  componentDidMount() {
    this.getOfficeData();

    // Event handlers for modals
    document
      .getElementById("addOfficeRecordForm")
      .addEventListener("submit", this.handleSubmitAddOfficeRecord);
    document
      .getElementById("updateOfficeRecordForm")
      .addEventListener("submit", this.handleSubmitUpdateOfficeRecord);
    document
      .getElementById("deleteOfficeButton")
      .addEventListener("click", this.handleDeleteOfficeRecord);

  // Tidy up when modal closes
  window.$("#createRecordModal").on("hide.bs.modal", function(event) {    
    document.getElementById("addOfficeRecordForm").reset();
    document.getElementById("formMessage").innerHTML = "";
    document.getElementById("formMessage").className = "";
    document.getElementById("addOfficeButton").className = "btn btn-primary";
  });
  window.$("#deleteRecordModal").on("hide.bs.modal", function(event) {
    document.getElementById("deleteOfficeButton").className = "btn btn-danger";
    document.getElementById("deleteformMessage").innerHTML = "";
  });
  window.$("#updateRecordModal").on("hide.bs.modal", function(event) {
    document.getElementById("updateOfficeRecordForm").reset();
    document.getElementById("updateformMessage").innerHTML = "";
    document.getElementById("updateformMessage").className = "";
    document.getElementById("updateOfficeButton").className = "btn btn-primary";
      // clear adminLocked fields on update modal
      document.getElementById("modal-update-building").disabled = false;
      document.getElementById("modal-update-number").disabled = false;
      document.getElementById("modal-update-street").disabled = false;
      document.getElementById("modal-update-town").disabled = false;
      document.getElementById("modal-update-postcode").disabled = false;
      document.getElementById("modal-update-adminLock").disabled = false;
    });
    // Inject card specific information into 'change' and 'delete' modals
    window.$("#deleteRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title"); // Extract info from data-* attributes
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier); // Update modal with record identifier
      // Lock delete if adminLock is true
      if (button.data("record-adminlock") === true) {
        document.getElementById("deleteformMessage").innerHTML =
          "This record is locked. Only the Admin can change it!";
        document.getElementById("delete-warning-confirm").innerHTML =
          "DELETE FORBIDDEN!";
        document.getElementById("deleteformMessage").className = "modal-error";
        document.getElementById("deleteOfficeButton").className =
          "btn hide";
      } else {
        document.getElementById("deleteformMessage").innerHTML = "";
        document.getElementById("delete-warning-text").innerHTML =
          "You are about to delete this record. If you continue, this information will be permanently deleted and cannot be recovered.";
        document.getElementById("delete-warning-confirm").innerHTML =
          "Are you sure you want to continue?";
        document.getElementById("deleteOfficeButton").className =
          "btn btn-danger";
      }
    });
    window.$("#updateRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      // Extract info from data-* attributes and update modal with values to edit
      document.getElementById("modal-update-office").value = button.data(
        "record-office"
      );
      document.getElementById("modal-update-building").value = button.data(
        "record-building"
      );
      document.getElementById("modal-update-number").value = button.data(
        "record-number"
      );
      document.getElementById("modal-update-street").value = button.data(
        "record-street"
      );
      document.getElementById("modal-update-town").value = button.data(
        "record-town"
      );
      document.getElementById("modal-update-postcode").value = button.data(
        "record-postcode"
      );
      document.getElementById("modal-update-adminLock").value = button.data(
        "record-adminlock"
      );
      if (button.data("record-adminlock") === true) {
        // for updates, grey out all fields on adminLock === true
        document.getElementById("modal-update-building").disabled = true;
        document.getElementById("modal-update-office").disabled = true;
        document.getElementById("modal-update-number").disabled = true;
        document.getElementById("modal-update-street").disabled = true;
        document.getElementById("modal-update-town").disabled = true;
        document.getElementById("modal-update-postcode").disabled = true;
        document.getElementById("modal-update-adminLock").disabled = true;
        document.getElementById("updateformMessage").innerHTML =
          "Record is locked. Only Admin can change it!";
        document.getElementById("updateformMessage").className = "modal-error";
        document.getElementById("updateOfficeButton").className =
          "btn hide";
      } else {
        document.getElementById("updateformMessage").innerHTML = "";
        document.getElementById("updateOfficeButton").className =
          "btn btn-primary";
      }
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
        <div className="padding-top-10vh">
          <Loader
            type="Circles"
            color="#FFFFFF"
            height={150}
            width={150}
            timeout={0} // Show until data loads
          />
        </div>
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
              <div className="card-text hide">{"adminLock: " + data.adminLock}</div>
            </div>
            <div className="row justify-content-center">
              <span
                data-toggle="modal"
                data-target="#updateRecordModal"
                data-record-office={data.office}
                data-record-building={data.building}
                data-record-number={data.number}
                data-record-street={data.street}
                data-record-town={data.town}
                data-record-postcode={data.postcode}
                data-record-adminlock={data.adminLock}
                data-record-id={data.id}
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
                data-record-adminlock={data.adminLock}
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
                {/* Update record form */}
                <form id="updateOfficeRecordForm">
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        id="modal-update-office"
                        name="office"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Office names must be unique"
                        disabled
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
                        id="modal-update-building"
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
                        id="modal-update-number"
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
                        id="modal-update-street"
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
                        id="modal-update-town"
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
                        id="modal-update-postcode"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <label>adminLock?</label>
                      <select
                        name="adminLock"
                        id="modal-update-adminLock"
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
                  <div id="updateformMessage"></div>
                  <br />
                  <div className="form-group">
                    <button
                      type="submit"
                      value="submit"
                      className="btn btn-primary"
                      id="updateOfficeButton"
                    >
                      Update office
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  id="updateDocumentCloseButton"
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
              <div id="modal-delete-text" className="modal-body">
                <strong>
                  <h6
                    id="delete-office-name"
                    className="modal-record-title text-primary"
                  >
                    Office
                  </h6>
                </strong>
                <p id="delete-warning-text"></p>
                <h6 className="text-danger" id="delete-warning-confirm">Confirm</h6>
                {/* Success/error message */}
                <div id="deleteformMessage"></div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="deleteDocumentCloseButton"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  id="deleteOfficeButton"
                  className="btn btn-danger"
                >
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
