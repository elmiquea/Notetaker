// Import express and create a router
const express = require('express');
const router = require('express').Router();

// Import fs to read and write the db.json file
const fs = require('fs');

// Import uuid to generate unique ids for the notes
const uuid = require('../helpers/uuid');

// Define a function to read the db.json file and parse it as JSON
const readDbFile = () => {
  const data = fs.readFileSync('./db/db.json');
  return JSON.parse(data);
};

// Define a function to write the db.json file with a given JSON object
const writeDbFile = (data) => {
  const stringData = JSON.stringify(data);
  fs.writeFileSync('./db/db.json', stringData);
};

// Handle GET requests for /notes and send back the db.json data
router.get('/notes', (_req, res) => {
  const dbData = readDbFile();
  res.send(dbData);
});

// Handle POST requests for /notes and add a new note to the db.json file
router.post('/notes', (req, res) => {
  // Get the note from the request body
  const userNote = req.body;

  // Read the db.json file and push the new note with a unique id
  const dbData = readDbFile();
  userNote.id = uuid();
  dbData.push(userNote);

  // Write the updated data to the db.json file
  writeDbFile(dbData);

  // Send a response message
  res.send('Note Added');
});

// Handle DELETE requests for /notes/:id and remove a note from the db.json file by id
router.delete('/notes/:id', (req, res) => {
  // Get the id of the note to delete from the request params
  const deleteNoteId = req.params.id;

  // Read the db.json file and filter out the note with the matching id
  const dbData = readDbFile();
  const filteredData = dbData.filter((note) => note.id !== deleteNoteId);

  // Write the filtered data to the db.json file
  writeDbFile(filteredData);

  // Send a response status of 204 No Content
  res.status(204).send();
});

// Export the router module
module.exports = router;
