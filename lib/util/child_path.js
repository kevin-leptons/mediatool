function child_path(path, root) {
    return path.replace(root, '');
}

module.exports = child_path;
