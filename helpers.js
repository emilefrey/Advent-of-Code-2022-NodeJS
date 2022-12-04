const splitByNewLine = (data) => data.split(/\r?\n/);

const splitBySpace = (data) => data.split(" ");

const splitByBlankLine = (data) => data.split(/\n\n/);

const isUpperCase = (string) => /^[A-Z]*$/.test(string);

module.exports = {
  splitByNewLine,
  splitBySpace,
  splitByBlankLine,
  isUpperCase,
};
