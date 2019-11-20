// React Contact page content component
// M. Allen - 2019

import React, {Component} from 'react';

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="App-body App-contact pb-5">
          <div id="contactMe">
            <div className="container App-content">
              <div className="row">
                <div className="col-lg-3">
                  <h2>Contact me</h2>
                </div>
                <div className="col-lg-9">
                  <form id="contactform" method="POST">
                    <div className="row">
                      <label className="control-label col-sm-2 col-xs-12">Name:</label>
                      <div className="form-group col-sm-10 col-xs-12">
                        <input className="contactCell input-field" type="text" name="name" placeholder="Please enter your name here" />
                      </div>
                    </div>
                    <div class="row">
                      <label class="control-label col-sm-2 col-xs-12">Email:</label>
                      <div class="form-group col-sm-10 col-xs-12">
                        <input type="email" class="contactCell input-field" name="_replyto" placeholder="Please enter your email address here" />
                      </div>
                    </div>
                    <div class="row">
                      <label class="control-label col-sm-2 col-xs-12">Message:</label>
                      <div class="form-group col-sm-10 col-xs-12">
                        <textarea rows="6" class="contactCell input-field" name="message" placeholder="Please enter your message here"></textarea>
                      </div>
                    </div>
                    <input type="hidden" name="_subject" value="MAWD Website contact" />
                    <input type="text" name="_gotcha" className="gotcha" />
                    <div class="row">
                      <div class="col-sm-3"></div>
                      <div class="form-group form-group-btn col-xs-12 col-sm-9">
                        <button class="btn btn-theme" type="submit" value="Send">Send message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;