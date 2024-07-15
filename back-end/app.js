// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const authRoutes = require('./routes/auth');
const connectDatabase = require('./db/mongoose'); // Ensure this is correct

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDatabase()


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Auth Home Endpoint 🧩');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
