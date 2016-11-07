module.exports = {
  green:function green(s){
    return '\x1B[32m' + s + '\x1B[0m';
  },
  yellow: function yellow(s){
    return '\x1B[33m' + s + '\x1B[0m';
  },
  red: function red(s){
    return '\x1B[31m' + s + '\x1B[0m';
  }
};