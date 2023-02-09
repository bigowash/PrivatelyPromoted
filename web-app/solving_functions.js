const help = Object.create(null);
// const fs = require('fs')


// adds the numbers into the dictionary of current numbers
// fills rows and cols
help.fill_numbers = function () {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let value = options[row][col];
            if (value === 0) {
                options[row][col] = [];
            } else {
                help.update_instances(value, row, col);
            }
        }
    }
    return help;
};

help.getdata = function () {
    fs.readFile('/database/' + user_filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        return data
    });
}
export default Object.freeze(help);
