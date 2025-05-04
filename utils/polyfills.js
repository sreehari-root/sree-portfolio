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

  // Create a more robust URLSearchParams polyfill
  if (!global.URLSearchParams) {
    global.URLSearchParams = class URLSearchParams {
      constructor(init) {
        this.params = new Map();
        if (init) {
          // Parse the string
          if (typeof init === 'string') {
            init = init.replace(/^\?/, '');
            const pairs = init.split('&');
            for (const pair of pairs) {
              const [key, value = ''] = pair.split('=');
              this.append(decodeURIComponent(key), decodeURIComponent(value));
            }
          }
        }
      }
      
      append(name, value) {
        const values = this.params.get(name) || [];
        values.push(value);
        this.params.set(name, values);
      }
      
      get(name) {
        const values = this.params.get(name);
        return values ? values[0] : null;
      }
      
      getAll(name) {
        return this.params.get(name) || [];
      }
      
      toString() {
        let result = '';
        this.params.forEach((values, key) => {
          values.forEach(value => {
            if (result) result += '&';
            result += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          });
        });
        return result;
      }
    };
  }
  
  // Ensure URL functionality
  if (global.URL && !global.URL.prototype.toJSON) {
    global.URL.prototype.toJSON = function() {
      return this.toString();
    };
  }
  
  if (typeof global.atob === 'undefined') {
    global.atob = function(input) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let str = input.replace(/=+$/, '');
      let output = '';
      
      for (let bc = 0, bs = 0, buffer, i = 0; 
        buffer = str.charAt(i++); 
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
        buffer = chars.indexOf(buffer);
      }
      
      return output;
    };
  }
  
  if (typeof global.btoa === 'undefined') {
    global.btoa = function(input) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let output = '';
      let i = 0;
      
      for (
        let block, charCode, idx = 0, map = chars;
        input.charAt(idx | 0) || (map = '=', idx % 1);
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = input.charCodeAt(idx += 3/4);
        block = block << 8 | charCode;
      }
      
      return output;
    };
  }
}

export default {};