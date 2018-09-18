const async = require('async');
const fs = require('fs');
const _ = require('lodash');

let lines = [];
async.parallel([
    function(callback) {
        fs.readFile('a.log', (err, data) => {
            console.log('done with a');
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    },

    function(callback) {
        fs.readFile('b.log', (err, data) => {
            console.log('done with b');
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    },

    function(callback) {
        fs.readFile('c.log', (err, data) => {
            console.log('done with c');
            if (err) throw err;
            callback(null, data.toString().trim().split(/\n/));
        });
    }

], function(err, results) {
    if (err) throw err;
    console.log(_.flatten(results));
});
