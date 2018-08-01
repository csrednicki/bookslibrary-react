# bookslibrary-react
Simple CMS to manage books library written in React and Node.js

# Usage
In order to install all dependencies enter project directory and use command:
`npm install`

Then in the project directory run command:
`npm run dev`

This command will start node server instance and also web server.
Open web browser (preferably Chrome) and go to url:
http://localhost:3000/

# Functionalities
* Adding book form - Fields: book title, description, isbn, cover image
* Editing book form - Fields: book title, description, isbn, cover image
* Deleting book - Application will ask for confirmation before book deletion.
* Search - Search input field uses Regular Expressions filtering
* Saving all books - Books data is saved in JSON file format. File is named books.json and can be found in main project folder.
* Serving API
  * GET /bookstore/getBooks
  * PUT /bookstore/saveBooks
* Generating different code bundles for production and development environments.

# Used technologies & what for
* HTML 5 - web page layout
* CSS 3 - styling layout
* SVG - icons
* JavaScript ES6 - application code
* React 16 - application code framework
* JSON - flat file for storing books
* NPM - package manager
* Node.js - api server for reading and storing books
* Nodemon - for watching changes in node.js scripts
* Express.js - api framework
* Webpack - bundling code for development and production environments
* Babel - transpiling code to Javascript ES5 for better browser compatibility
* Bootstrap - styling web page
* Animate.css - css library for animating page elements
* Bootswatch Materia - bootstrap theme https://bootswatch.com/materia/
* jQuery AJAX - used for sending books data to api
