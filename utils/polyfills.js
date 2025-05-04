// Comprehensive URL polyfills for Expo Snack
if (typeof global !== 'undefined') {
  // Define basic decoder function
  if (!global.decodeURIComponent) {
    global.decodeURIComponent = function(str) {
      return str.replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
      });
    };
  }

  // Create missing TextEncoder/TextDecoder
  if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = class TextEncoder {
      encode(str) {
        const encoded = [];
        for (let i = 0; i < str.length; i++) {
          encoded.push(str.charCodeAt(i));
        }
        return encoded;
      }
    };
  }

  if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = class TextDecoder {
      decode(bytes) {
        return String.fromCharCode.apply(null, bytes);
      }
    };
  }

  // Ensure URL handling
  if (typeof global.URL === 'undefined') {
    global.URL = function(url, base) {
      this.href = url;
      this.protocol = 'https:';
      this.host = url.split('//')[1]?.split('/')[0] || '';
      this.hostname = this.host;
      this.pathname = '/' + (url.split('//')[1]?.split('/').slice(1).join('/') || '');
      this.search = '';
      this.hash = '';
      
      this.toString = function() {
        return this.href;
      };
    };
  }
}

export default {};