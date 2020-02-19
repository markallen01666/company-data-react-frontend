# React company CRUD frontend
HTML, CSS, JS, Bootstrap 4 and React

A new React CRUD frontend to serve my company data test project. This is part of an ongoing project to improve my skills. I am building a simple company data interface for a fictional company. The interface allows the user to read, add, update, and delete staff and office records.

The backend code can be found at: https://github.com/markallen01666/company-data-node-backend

The frontend is hosted on Google Firebase, talking to a Node/Express/Mongoose backend hosted on Heroku. The backend in turn interacts with a MongoDB database hosted on MongoDB Atlas.

Feel free to try the app out and create, update and delete records.

You can access the current version at: https://company123uk.firebaseapp.com/


++++

This project is very much a work in progress 

Current status: 

Work on this web app is paused. I'm currently working on building up my React and React Native skills so that I can imporve this app and build an Android/iOS app that delivers the same functionality before adding any more to it. This will mean that I can then work on the development of both, hand-in-hand, wrt things like a user login etc, rather than doing the work twice at separate times.


I'll be adding more functionality over time. Planned work:

- Full refactoring of the code in Offices.js and Staff.js as both have become monolithic
- Validation on entry/update fields - e.g. valid telephone numbers, staff ID codes etc
- Dropdown list of sort options - e.g. list staff by office
- Dropdown for Employee Office, so that Office must exist before staff member works there
- Delete validation - you cannot delete an office while an employee is still based there
- User login
- Admin login allowing changes to adminLocked records




