const splitByNewLine = (data) => data.split(/\r?\n/);

const splitBySpace = (data) => data.split(" ");

const splitByBlankLine = data => data.split(/\n\n/)
module.exports = { splitByNewLine, splitBySpace, splitByBlankLine };
