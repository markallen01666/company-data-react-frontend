# React company CRUD frontend
HTML, CSS, JS, Bootstrap 4 and React

A new React CRUD frontend to serve my company data test project. This is part of an ongoing project to improve my skills. I am building a simple company data interface for a fictional company. The interface allows the user to read, add, update, and delete staff and office records.

The backend code can be found at: https://github.com/markallen01666/company-data-node-backend

The frontend is hosted on Google Firebase, talking to a Node/Express/Mongoose backend hosted on Heroku. The backend in turn interacts with a MongoDB database hosted on MongoDB Atlas.

Feel free to try the app out and create, update and delete records.

You can access the current version at: https://company123uk.firebaseapp.com/

++++

This project is very much a work in progress - I'll be adding more functionality over time. Planned work:

Validation on entry/update fields - e.g. valid telephone numbers, staff ID codes etc

- Dropdown list of sort options - e.g. list staff by office
- Dropdown for Employee Office, so that Office must exist before staff member works there
- Delete validation - you cannot delete an office while an employee is still based there
- User login
- Admin login allowing changes ot adminLocked records
- Add contry field for offices
- Data validation based on country - e.g. ZIP code format for staff in US offices

After this my plan is to recreate the front end using Angular and Vue to refresh my Vue skills and to learn Angular

