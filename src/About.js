// React About page content component
// M. Allen - 2019

import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="App-body App-about">
        <div className="container App-content">
          <div className="row text-xs-center text-sm-left">
            <div className="col-xs-12 col-sm-6">
              <h2>About this app</h2>
              <p>
                This is a demonstration of a MERN web app. The front-end of the
                app is built using React and Bootstrap 4. The back-end is built
                using Node, Express, MongoDB and Mongoose. The front-end is
                hosted on Google Firebase, the Node back-end is hosted on
                Heroku, while the MongoDB database is hosted on MongoDB Atlas.
              </p>
              <p>
                This project simulates a simple CRUD (Create, Read, Update,
                Delete) interface to a fictional company's office and staff
                data. The user can read the company data, make changes to the
                data, delete records, and create new records.
              </p>
              <p>
                I built this project to test my new MERN skills after working
                through Greg Lim's excellent books{" "}
                <em>"Beginning Node.js, Express, and MongoDB Development"</em>{" "}
                and <em>"Beginning React"</em> which I highly recommend. My plan
                is to duplicate the front-end using Vue and Angluar once the
                React implementation is working to my satisfaction.
              </p>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h2>Who I am</h2>
              <p>
                My name's Mark Allen. I work part-time as a freelance web
                developer, building and maintaining webistes for small
                businesses and charities. I am based in the historic market town
                of Malmesbury in Wiltshire in the UK.
              </p>
              <p>
                My background includes over thirty years of working for big
                corporations and SMEs, government departments, the police, and
                charities. Recently I have been combining part-time freelance
                work with my main role of being a stay-at-home-parent for my two
                children. I am currently refining my skillset in preparation for
                returning to full-time work.
              </p>
              <p>
                I've got certifications in front-end web development, JavaScript
                programming, and technical writing. I also have a first-class BSc(Hons)
                degree in Environmental Studies with a focus on communication
                and environmental technology.
              </p>
              <p>
                In my spare time I'm an independent board member for a housing
                association with 12,000 homes in the West of England, and a trustee for a small community development charity.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
