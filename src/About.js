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
              <h2>What I do</h2>
              <p>
                I can help you with all your web needs. Whether you want a
                completely new website, some simple updates, or if you're
                encountering problems and want somebody to sort them out - get
                in touch today and I'll explain how I can help.
              </p>
              <p>
                I specialise in the standard web technologies HTML, CSS and
                Javascript but I also have experience of working with tools such
                as Wordpress, Bootstrap, React, MongoDB, NodeJS and jQuery.
              </p>
              <p>
                Even if you need help with software that is new to me, I can
                usually get up to speed very quickly so that in a short space of
                time I can safely modify existing installations and identify
                effective solutions to problems.
              </p>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h2>Who I am</h2>
              <p>
                I'm a freelance web developer based in the historic UK town of
                Malmesbury in Wiltshire. My background includes over thirty
                years of working for big corporations and SMEs, government
                departments, the police, and charities.
              </p>
              <p>
                I've got qualifications in front-end web development, computer
                programming, Unix & Linux systems administration, technical
                writing, and copywriting. I also have a first-class BSc(Hons)
                degree in Environmental Studies with a focus on communication
                and environmental technology.
              </p>
              <p>
                In my spare time I'm an independent board member for a housing
                association with 12,000 homes in the West of England.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
