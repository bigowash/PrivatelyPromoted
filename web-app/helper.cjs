const help = Object.create(null);
const fs = require('fs')

help.getData = function (data, filename) {
    fs.writeFile("./web-app/static/database/" + filename, JSON.stringify(data), (err, data) => {
        if (err) throw err;
        console.log('The file has been saved!');
        return data
    });
}

module.exports = help;