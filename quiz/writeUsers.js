const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()

let users = [];

// Middleware to ensure users are loaded and to save users back to the file
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

// Add a new user
router.post('/adduser', (req, res) => {
  const newUser = req.body;
  req.users.push(newUser);
  fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(req.users), (err) => {
    if (err) {
      console.log('Failed to write');
      res.status(500).json({ error: 'Failed to save the user' });
    } else {
      console.log('User Saved');
      res.send('User added successfully');
    }
  });
});

module.exports = router;
