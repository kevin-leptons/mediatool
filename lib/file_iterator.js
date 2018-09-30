const fs = require('fs');
const path = require('path');

class FileIterator {
    constructor(root_path) {
        this._root_path = root_path;
        this.reset();
    }
    
    next() {
        for (;;) {
            let file = this._files.shift();
            if (!file) {
                return null;
            }
            if (file.stat.isDirectory()) {
                this._read_dir(file.path);
            } else {
                return file.path;
            }
        }

    }

    reset() {
        let root_file = this._read_stat(this._root_path);
        this._files = [root_file];
    }

    // private methods

    _read_dir(root) {
        let files = fs.readdirSync(root);

        for (let i in files) {
            let file = path.join(root, files[i]);
            let stat = this._read_stat(file);

            this._files.unshift(stat);
        }
    }

    _read_stat(file) {
        return {
            path: file,
            stat: fs.statSync(file)
        };
    }
}

module.exports = FileIterator;
