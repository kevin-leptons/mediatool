const path = require('path');

const NO_DOT_VIDEO_EXTS = [
    // video formats
    'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gif', 'gifv', '.mng',
    'avi', 'mov', 'qt', 'wmv', 'yuv', 'rm', 'rmvb', '.asf', 'amv', 'mp4',
    'm4p', 'm4v', 'mpg', 'mpg2', 'mpeg', 'mpe', 'mpv', 'mpg', 'svi', '3gp',
    '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b'
];
const DOT_VIDEO_EXTS = NO_DOT_VIDEO_EXTS.map(ext => '.' + ext);
const VIDEO_EXTS = new Set(DOT_VIDEO_EXTS);

function is_video(file) {
    let ext = path.extname(file);

    return VIDEO_EXTS.has(ext);
}

module.exports = {
    is_video: is_video
};
