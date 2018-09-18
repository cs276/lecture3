const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const path = require('path');
const session = require('express-session');

const hostname = '127.0.0.1';
const port = 3000;

const USERS = {'jharvard': 'crimson'};

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
}));

function loginRequired(req, res, next) {
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        next();
    }
}

app.get('/', loginRequired, (req, res) => {
    res.render('index', {
        username: req.session['username'],
        users: _.keys(USERS)
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (!USERS[username] || USERS[username] != password) {
        res.redirect('/login');
    } else {
        req.session.username = username;
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    let {username, password} = req.body;
    if (username && password) {
        USERS[username] = password;
    }

    res.redirect('/login');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});
