const express = require('express');
const cors = require('cors');
const readUsers = require('./readUsers'); // Make sure this path is correct
const writeUsers = require('./writeUsers'); // Make sure this path is correct

const app = express();
const port = 8000;

// Enable CORS and body parsing
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routers
app.use('/read', readUsers);
app.use('/write', writeUsers);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
