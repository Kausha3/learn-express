const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');


// Assuming users data is loaded here or passed in some way
let users = [];

// Middleware to check if users are loaded
router.use((req, res, next) => {
  if (!users.length) {
    fs.readFile(path.resolve(__dirname, '../data/users.json'), (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load users' });
      }
      users = JSON.parse(data);
      req.users = users;
      next();
    });
  } else {
    req.users = users;
    next();
  }
});

// Get all usernames
router.get('/usernames', (req, res) => {
  let usernames = req.users.map(user => ({ id: user.id, username: user.username }));
  res.json(usernames);
});

// Get user email by username
router.get('/username/:name', (req, res) => {
  const { name } = req.params;
  const user = req.users.find(user => user.username === name);
  if (user) {
    res.json({ email: user.email });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
