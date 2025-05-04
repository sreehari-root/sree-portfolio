// Simple URL decode polyfill
if (!global.decodeURIComponent) {
  global.decodeURIComponent = function(str) {
    return str.replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    });
  };
}

export default {};