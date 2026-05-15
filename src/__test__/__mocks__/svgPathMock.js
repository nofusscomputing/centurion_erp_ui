const path = require('path');

module.exports = {
  process(sourceText, sourcePath, options) {

    let a = 'a'
    
    return {
      code: `module.exports = ${JSON.stringify(sourcePath)};`,
    };
  },
};
