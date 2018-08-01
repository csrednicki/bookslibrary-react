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
