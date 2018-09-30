const path = require('path');
const fs = require('fs');

const shell = require('shelljs');

const FileIterator = require('./file_iterator')  ;
const {child_path, name_no_ext} = require('./util');
const media_type = require('./media_type');

/*
conf - Object.
    * src - String. Path to source directory.
    * dest - String. Path to destination directory.
*/
function convert_to_mp3(conf) {
    let it = new FileIterator(conf.src);
    let file_total = count_files(it);
    let file_order = 1;

    it.reset();
    console.log(`"${conf.src}": found ${file_total} files`);
    for (let file = it.next(); file !== null; file = it.next()) {
        let relative_file = child_path(file, conf.src);
        if (media_type.is_video(relative_file)) {
            process.stdout.write(`${file}... (${file_order}/${file_total})`);
            convert(file, relative_file, conf.dest, conf.override);
            file_order += 1;
            process.stdout.write(' done\n');
        }
    }
}

function convert(src_file, relative_file, root_dest, override) {
    let src_name = name_no_ext(relative_file);
    let dest_relative_dir = path.dirname(relative_file);
    let dest_file = path.join(root_dest, dest_relative_dir, src_name + '.mp3');
    let dest_dir = path.dirname(dest_file);

    make_dir(dest_dir);
    run_converting(src_file, dest_file, override);
}

function make_dir(dir) {
    shell.mkdir('-p', dir);
}

function run_converting(src, dest, override=false) {
    if (fs.existsSync(dest) && !override) {
        return;
    }

    let cmd = [
        'ffmpeg',
        '-i',
        `"${src}"`,
        `"${dest}"`
    ].join(' ');
    let ret = shell.exec(cmd, {
        silent: true
    });
    if (ret.code !== 0) {
        throw Error(`Converting failed, exit with ${ret.code}. ${ret.stderr}`);
    }
}

function count_files(it) {
    let total = 0;

    for (let file = it.next(); file !== null; file = it.next()) {
        if (media_type.is_video(file)) {
            total += 1;
        }
    }

    return total;
}

module.exports = convert_to_mp3;
