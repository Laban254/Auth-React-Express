// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const { createUser } = require('../auth/helpers');

router.post('/register', async (req, res) => {
  try {
    const user = await createUser(req);
    req.login(user, err => {
      if (err) return res.status(500).json({ status: 'error' });
      return res.status(200).json({ status: 'success' });
    });
  } catch (err) {
    return res.status(500).json({ status: 'error' });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ status: 'success' });
});

module.exports = router;
