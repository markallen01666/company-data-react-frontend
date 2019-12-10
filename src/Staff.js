// Company Data App Frontend - React Staff page content component
// M. Allen - 2019

import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

class Staff extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleSubmitAddEmployeeRecord = this.handleSubmitAddEmployeeRecord.bind(
      this
    );
    this.handleSubmitUpdateEmployeeRecord = this.handleSubmitUpdateEmployeeRecord.bind(
      this
    );
    this.handleDeleteEmployeeRecord = this.handleDeleteEmployeeRecord.bind(this);
    this.handleModalDocumentReset = this.handleModalDocumentReset.bind(this);
  }

  // Retrieving documents from Employee collection in database
  getEmployeeData() {
    axios.get(this.props.employeeDataURL).then(res => {
      this.setState({
        data: this.sortData(res.data)
      });
    });
  }

  // Sort data before presentation to user
  sortData(data) {
    // Use firstName and then lastName to give name sorted array
    let dataSortedByName = data.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    dataSortedByName = dataSortedByName.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
    return dataSortedByName;
  }

  // Adding new document to Employee collection in database
  handleSubmitAddEmployeeRecord(event) {
    event.preventDefault();
    let formData = {
      staffId: document.getElementById("staffId").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      office: document.getElementById("office").value,
      position: document.getElementById("position").value,
      telephone: document.getElementById("telephone").value,
      email: document.getElementById("email").value,
      adminLock: document.getElementById("adminLock").value
    };
    let formMessage = document.getElementById("formMessage");
    axios
      .post(this.props.employeeDataURL + "/add", formData)
      .then(response => {
        if (response.data.status === "Fail") {
          // 'Add' was rejected because Employee ID is not unique
          formMessage.className = "modal-error";
        } else {
          formMessage.className = "modal-success"; // Document added to database successfully
          document.getElementById("addEmployeeButton").className += " btn-hide";
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

  // Updating Employee document collection in database
  handleSubmitUpdateEmployeeRecord(event) {
    event.preventDefault();
    let formData = {
      staffId: document.getElementById("modal-update-staffId").value,
      firstName: document.getElementById("modal-update-firstName").value,
      lastName: document.getElementById("modal-update-lastName").value,
      office: document.getElementById("modal-update-office").value,
      position: document.getElementById("modal-update-position").value,
      telephone: document.getElementById("modal-update-telephone").value,
      email: document.getElementById("modal-update-email").value,
      adminLock: document.getElementById("modal-update-adminLock").value
    };
    let formMessage = document.getElementById("updateformMessage");
    axios
      .post(this.props.employeeDataURL + "/update", formData)
      .then(response => {
        formMessage.className = "modal-success"; // Document updated successfully
        document.getElementById("updateEmployeeButton").className +=
          " btn-hide";

        // Replace record info in state.data with updated version
        let stateHolder = this.state.data;
        let updateIndex = stateHolder.findIndex(
          sh => sh.staffId === formData.staffId
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

  // Delete employee record
  handleDeleteEmployeeRecord(event) {
    event.preventDefault();
    let formData = {
      staffId: document.getElementById("delete-staffId").innerHTML
    };
    let formMessage = document.getElementById("deleteformMessage");
    axios
      .post(this.props.employeeDataURL + "/delete", formData)
      .then(response => {
        formMessage.className = "modal-success"; // Document deleted successfully
        document.getElementById("deleteEmployeeButton").className +=
          " btn-hide";
        // Remove record info from state.data
        let stateHolder = this.state.data;
        let updateIndex = stateHolder.findIndex(
          sh => sh.staffId === formData.staffId
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

  // Tidy up when modal closes
  handleModalDocumentReset() {
    document.getElementById("addEmployeeRecordForm").reset();
    document.getElementById("formMessage").innerHTML = "";
    document.getElementById("formMessage").className = "";
    document.getElementById("addEmployeeButton").className = "btn btn-primary";
    document.getElementById("updateEmployeeRecordForm").reset();
    document.getElementById("updateformMessage").innerHTML = "";
    document.getElementById("updateformMessage").className = "";
    document.getElementById("updateEmployeeButton").className =
      "btn btn-primary";
    document.getElementById("deleteEmployeeButton").className =
      "btn btn-danger";
    document.getElementById("deleteformMessage").innerHTML = "";
  }

  componentDidMount() {
    this.getEmployeeData();

    // Event handlers for modal forms
    document
      .getElementById("addEmployeeRecordForm")
      .addEventListener("submit", this.handleSubmitAddEmployeeRecord);
    document
      .getElementById("updateEmployeeRecordForm")
      .addEventListener("submit", this.handleSubmitUpdateEmployeeRecord);
    document
      .getElementById("deleteEmployeeButton")
      .addEventListener("click", this.handleDeleteEmployeeRecord);
    document
      .getElementById("createDocumentCloseButton")
      .addEventListener("click", this.handleModalDocumentReset);
    document
      .getElementById("updateDocumentCloseButton")
      .addEventListener("click", this.handleModalDocumentReset);
    document
      .getElementById("deleteDocumentCloseButton")
      .addEventListener("click", this.handleModalDocumentReset);

    // Inject card specific information into 'change' and 'delete' modals
    window.$("#deleteRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      let recordIdentifier = button.data("record-title"); // Extract info from data-* attributes
      let recordStaffId = button.data("record-staffid");
      let modal = window.$(this);
      modal.find(".modal-record-title").text(recordIdentifier); // Update modal
      document.getElementById("delete-staffId").innerHTML = recordStaffId;
      // Lock delete if adminLock is true
      if (button.data("record-adminlock") === true) {
        document.getElementById("deleteformMessage").innerHTML =
          "This record is locked. Only the Admin can change it!";
        document.getElementById("delete-warning-confirm").innerHTML =
          "DELETE FORBIDDEN!";
        document.getElementById("deleteformMessage").className = "modal-error";
        document.getElementById("deleteEmployeeButton").className =
          "btn btn-hide";
      } else {
        document.getElementById("deleteformMessage").innerHTML = "";
        document.getElementById("delete-warning-text").innerHTML =
          "You are about to delete this record. If you continue, this information will be permanently deleted and cannot be recovered.";
        document.getElementById("delete-warning-confirm").innerHTML =
          "Are you sure you want to continue?";
        document.getElementById("deleteEmployeeButton").className =
          "btn btn-danger";
      }
    });
    window.$("#updateRecordModal").on("show.bs.modal", function(event) {
      let button = window.$(event.relatedTarget); // Button/Span that triggered the modal
      // Extract info from data-* attributes and update modal with values to edit
      document.getElementById("modal-update-staffId").value = button.data(
        "record-staffid"
      );
      document.getElementById("modal-update-firstName").value = button.data(
        "record-firstname"
      );
      document.getElementById("modal-update-lastName").value = button.data(
        "record-lastname"
      );
      document.getElementById("modal-update-office").value = button.data(
        "record-office"
      );
      document.getElementById("modal-update-position").value = button.data(
        "record-position"
      );
      document.getElementById("modal-update-telephone").value = button.data(
        "record-telephone"
      );
      document.getElementById("modal-update-email").value = button.data(
        "record-email"
      );

      document.getElementById("modal-update-adminLock").value = button.data(
        "record-adminlock"
      );
      if (button.data("record-adminlock") === true) {
        document.getElementById("updateformMessage").innerHTML =
          "Record is locked. Only Admin can change it!";
        document.getElementById("updateformMessage").className = "modal-error";
        document.getElementById("updateEmployeeButton").className =
          "btn btn-hide";
      } else {
        document.getElementById("updateformMessage").innerHTML = "";
        document.getElementById("updateEmployeeButton").className =
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
    let employeeCards = (
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
      employeeCards = this.state.data.map(data => (
        <div className="col-sm-4" key={data.staffId}>
          <div className="card card-spacing">
            <div className="card-body">
              <h5 className="card-title">
                {data.firstName + " " + data.lastName}
              </h5>
              <div className="card-text">
                {"Position: " +
                  (data.position.length > 0 ? data.position : "---")}
              </div>
              <div className="card-text">
                {"Office: " + (data.office.length > 0 ? data.office : "---")}
              </div>
              <div className="card-text">
                {"ID: " + (data.staffId ? data.staffId : "---")}
              </div>
              <div className="card-text">
                {"Telephone: " + (data.telephone ? data.telephone : "---")}
              </div>
              <div className="card-text">
                {"Email: " + (data.email.length > 0 ? data.email : "---")}
              </div>
              <div className="card-text">{"adminLock: " + data.adminLock}</div>
            </div>
            <div className="row justify-content-center">
              <span
                data-toggle="modal"
                data-target="#updateRecordModal"
                data-record-firstname={data.firstName}
                data-record-lastname={data.lastName}
                data-record-position={data.position}
                data-record-office={data.office}
                data-record-staffid={data.staffId}
                data-record-telephone={data.telephone}
                data-record-email={data.email}
                data-record-adminlock={data.adminLock}
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
                data-record-title={data.firstName + " " + data.lastName}
                data-record-staffid={data.staffId}
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
      <div className="App-body App-staff pb-5">
        <div className="container App-content">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 text-center">
              <h2>Employee records</h2>
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
          <div className="row padding-bottom-5vh">{employeeCards}</div>
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
                  Create a new Employee record
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
                <form id="addEmployeeRecordForm">
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="staff ID"
                        id="staffId"
                        name="staffId"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Staff ID must be unique"
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
                        placeholder="first name"
                        id="firstName"
                        name="firstName"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="last name"
                        id="lastName"
                        name="lastName"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="office"
                        placeholder="office"
                        id="office"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        placeholder="position"
                        id="position"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="telephone"
                        placeholder="telephone"
                        id="telephone"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="email"
                        id="email"
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
                      id="addEmployeeButton"
                    >
                      Add employee
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

        {/* Update 'record' modal */}
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
                  Edit employee record
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
                <form id="updateEmployeeRecordForm">
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        id="modal-update-staffId"
                        name="staffId"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Staff ID must be unique"
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
                        placeholder="first name"
                        id="modal-update-firstName"
                        name="firstName"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="last name"
                        id="modal-update-lastName"
                        name="lastName"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="office"
                        placeholder="office"
                        id="modal-update-office"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="position"
                        placeholder="position"
                        id="modal-update-position"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="telephone"
                        placeholder="telephone"
                        id="modal-update-telephone"
                        required
                      />
                    </div>
                  </div>
                  <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="email"
                        id="modal-update-email"
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
                      id="updateEmployeeButton"
                    >
                      Update employee
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
                    id="delete-employee-name"
                    className="modal-record-title text-primary"
                  >
                    Employee
                </h6>
                <h6
                    id="delete-staffId"
                    className="modal-record-staffId text-primary"
                  >
                    ID
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
                  id="deleteEmployeeButton"
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

export default Staff;
