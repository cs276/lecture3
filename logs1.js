const async = require('async');
const fs = require('fs');
const _ = require('lodash');

let lines = [];
async.series([
    function(callback) {
        fs.readFile('a.log', (err, data) => {
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    },

    function(callback) {
        fs.readFile('b.log', (err, data) => {
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    },

    function(callback) {
        fs.readFile('c.log', (err, data) => {
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    }

], function(err, results) {
    if (err) throw err;
    console.log(_.flatten(results));
});
