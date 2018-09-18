const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(session({secret: 'keyboard cat'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

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
    res.send('hello, world\n');
});

// if GET, show form; if POST, look up user and password in USERS; if correct, set req.session.user_id and redirect to /
app.get('/login', (req, res) => {
    res.render('login');
});

// if GET, show form; if POST, add new user to USERS
app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});


