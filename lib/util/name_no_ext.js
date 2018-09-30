const path = require('path');

function name_no_ext(file) {
    let name = path.basename(file);
    let extension = path.extname(name);

    return name.replace(extension, '');
}

module.exports = name_no_ext;
