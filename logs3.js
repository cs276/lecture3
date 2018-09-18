const async = require('async');
const fs = require('fs');
const _ = require('lodash');

let lines = [];
async.each(['a.log', 'b.log', 'c.log'], function(file, callback) {
    fs.readFile(file, (err, data) => {
        console.log(`done with ${file}`);
        if (err) throw err;
        lines = _.concat(lines, data.toString().trim().split(/\n/));
        callback();
    });
}, function(err) {
    if (err) throw err;
    console.log(lines);
});
