const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const session = require('express-session');
const flash = require('connect-flash');
const app = express();

const User = require('./models/User');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'yourSecretKey', // Replace 'yourSecretKey' with a real secret key
    saveUninitialized: true,
    resave: false
}));

// Flash middleware setup
app.use(flash());

// Access flash messages in views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Registration Page
app.get('/register', (req, res) => {
    res.render('register', { messages: req.flash('info') });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({ username, password: hashedPassword });
    req.flash('info', 'Registration successful. Please log in.');
    res.redirect('/login');
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('info') });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        req.flash('info', 'Invalid credentials');
        res.redirect('/login');
    }
});

// Home Page
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        req.flash('info', 'Please log in first');
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    // Destroy the user's session or any other logout logic
    req.session.destroy(() => {
        res.redirect('/login'); // Redirect to login page or homepage after logout
    });
});

// MongoDB connection
mongoose.connect('mongodb://localhost/expressLoginApp', { });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Additional routes for login and registration will be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
