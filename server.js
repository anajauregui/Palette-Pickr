// Here I am bringing in the necessary dependencies to use express, and to be able to parse requests with body-parser, set the environment based on the Node environment variable with a fallback default of 'development', connect to the database with knex, and serve static files from the 'public' directory using Express middleware.

const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const http = require("http");
const bodyParser = require('body-parser');
const cors = require("express-cors");
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Determine how the server can be accessed
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); // Allows the abillity to make GET, PUT, POST, and DELETE requests to the server
  next();
});

// This sets the port to where the application is visible; this defaults to localhost:3000 if the process.env.PORT variable is not available.
app.set('port', process.env.PORT || 3000)
// Within the locals object, this sets the title of the application to 'Palette Picker'
app.locals.title = 'Palette-Pickr';

// App.listen is listening for connections on the given port, which was previously set to default on localhost:3000, callback will then log in the terminal that 'Palette Picker' is running on the appropriate port.
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


// ENDPOINTS

// "app" is the instance of our Express application, followed by the method (GET, POST, DELETE), the path or endpoint requested, and lastly the handler, which includes logic for how the request should be handled and the response we will return to the client. Request and response are included params in the handler by default.

// Endpoints or paths follow a general format of '/api/v1'. We use relative paths to allow for the host to change between different environments (ie. development, production) and the restful design of 'api/v1' in case versions of the api change dramatically.

//Retrieve all saved projetcs from database
app.get('/api/v1/projects', (request, response) => { //GET request to '/api/v1/projects'
  database('projects').select() // In the database, select all from projects table, returns a promise
    .then(projects => {
      response.status(200).json(projects); // Consume promise and edit response object to send client status of 200 (OK) and in json format, all of the projects returned from database.
    })
    .catch(error => {
      response.status(500).json({ error }); // If there is a server-side error, respond to client with a status 500, and in json format, the error that occurred.
    });
});

//Retrieve all saved palettes from database
app.get('/api/v1/palettes', (request, response) => { //GET request to '/api/v1/palettes'
  database('palettes').select() // In the database, select all from projects table, returns a promise
    .then(palettes => {
      response.status(200).json(palettes); // Consume promise and edit response object to send client status of 200 (OK) and in json format, all of the palettes returned from database.
    })
    .catch(error => {
      response.status(500).json({ error }); // If there is a server-side error, respond to client with a status 500, and in json format, the error that occurred.
    });
});

//Retrieve saved project with specific ID from database
app.get('/api/v1/projects/:id', (request, response) => { //GET request to '/api/v1/projects:id' -- :id represents a dynamic ID
  database('projects').where('id', request.params.id).select() // In the database, select all from projects table, returns a promise
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects); // Consume promise and edit response object to send client status of 200 (OK) and in json format, all of the projects returned from database.
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
       });
      }
    })
    .catch(error => {
      response.status(500).json({ error }); // If there is a server-side error, respond to client with a status 500, and in json format, the error that occurred.
    });
});

//Retrieve saved palette with specific ID from database
app.get('/api/v1/palettes/:id', (request, response) => { //GET request to '/api/v1/palettes:id' -- :id represents a dynamic ID
  database('palettes').where('id', request.params.id).select() // In the database, select all from projects table, returns a promise
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes); // Consume promise and edit response object to send client status of 200 (OK) and in json format, all of the palettes returned from database.
      } else {
        response.status(404).json({
          error: `Could not find palette with id ${request.params.id}`
       });
      }
    })
    .catch(error => {
      response.status(500).json({ error }); // If there is a server-side error, respond to client with a status 500, and in json format, the error that occurred.
    });
});

//Save a new project to the database
app.post('/api/v1/projects', (request, response) => { //'POST' requests to '/api/v1/projects'
  database('projects')
  .insert( //insert the project_name and value into the projects table of the database and return all information for that project in promise form.
    {project_name: request.body.project_name,},'id')
  .then(projectId => {
    response.status(201).json(projectId) // Consume promise, and edit response object to send client status of 201 (successfully created) and in json format, the projectId that was just added to the database.
  })
  .catch(error => {
    response.status(500).json({ error }) // If there is a server-side error, respond to client with a status 500, and in json, the error that occurred.
  });
});

//Save a new palette to the database within a specific project
app.post('/api/v1/palettes', (request, response) => { //'POST' requests to '/api/v1/palettes'
  database('palettes').insert( //insert the palette_name and color values into the projects table of the database and return all information for that project in promise form.
    {
      palette_name: request.body.palette_name,
      color1: request.body.color1,
      color2: request.body.color2,
      color3: request.body.color3,
      color4: request.body.color4,
      color5: request.body.color5,
      project_id: request.body.project_id
    } , 'id')
    .then(paletteId => {
      response.status(201).json(paletteId); // Consume promise, and edit response object to send client status of 201 (successfully created) and in json format, the paletteId that was just added to the database.
    })
    .catch(error => {
      response.status(500).json({ error }); // If there is a server-side error, respond to client with a status 500, and in json, the error that occurred.
    });
});

app.delete('/api/v1/projects/:id', (request, response) => { // For 'DELETE' requests to '/api/v1/projetcs/:id' -- :id represents a dynamic ID
  database('projects')
  .where('id', request.params.id).delete() // Match the id number that was submitted with one in the palettes table of database, and delete that entire row in projects table. Returns a promise with either 0 or 1 value, depending on whether anything was successfully deleted.
  .then(response => response.sendStatus(200).json(response)) // Consume promise, and edit response object to send client status of 200 (successfully created) and the response in json format
  .catch(error => {
    response.status(500).json({ error }) // If there is a server-side error, respond to client with a status 500, and in json, the error that occurred.
  });
});


app.delete('/api/v1/palettes/:id', (request, response) => { // For 'DELETE' requests to '/api/v1/palettes/:id' -- :id represents a dynamic ID
  database('palettes')
  .where('id', request.params.id).delete() // Match the id number that was submitted with one in the palettes table of database, and delete that entire row in palettes table. Returns a promise with either 0 or 1 value, depending on whether anything was successfully deleted.
  .then(response => response.sendstatus(200).json(response)) // Consume promise, and edit response object to send client status of 200 (successfully created) and the response in json format
  .catch(error => {
    response.status(500).json({ error }) // If there is a server-side error, respond to client with a status 500, and in json, the error that occurred.
  });
});


// Export app to be used in testing suite
module.exports = app;
