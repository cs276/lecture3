const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(session({secret: 'keyboard cat'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());

app.use(favicon(__dirname + '/public/images/favicon.ico'));

const USERS = {'jharvard': 'crimson'};

function loginRequired(req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

// if GET, show UL of registered usernames
app.get('/', loginRequired, (req, res) => {
    res.render('index', {users: Object.keys(USERS)});
});

// if GET, show form; if POST, look up user and password in USERS; if correct, set req.session.user_id and redirect to /
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    var username = req.body.username,
        password = req.body.password;

    if (!USERS[username] && USERS[username] != password) {
        res.redirect('/login');
    } else {
        req.session.user_id = 1;
        res.redirect('/');
    }
});

// if GET, show form; if POST, add new user to USERS
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
        
    if (username && password) {
        USERS[username] = password;
    }

    res.redirect('/login');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});


