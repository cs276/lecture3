const fs = require('fs');
const _ = require('lodash');

let lines = [];
fs.readFile('a.log', (err, data) => {
    if (err) throw err;
    lines = _.concat(lines, data.toString().trim().split(/\n/));
    fs.readFile('b.log', (err, data) => {
        if (err) throw err;
        lines = _.concat(lines, data.toString().trim().split(/\n/));
        fs.readFile('c.log', (err, data) => {
            if (err) throw err;
            lines = _.concat(lines, data.toString().trim().split(/\n/));
            console.log(lines);
        });
    });
});
