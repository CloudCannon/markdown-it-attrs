const utils = require('../utils.js');


module.exports = function (options) {
  return {
    /**
       * Standalone image 
       * ![](img.png)\n{.d}
       */
    name: 'standalone image with attrs below',
    tests: [
      {
        shift: 0,
        type: 'inline',
        children: [
          {
            position: -3,
            type: 'image'
          }, {
            position: -2,
            type: 'softbreak'
          }, {
            position: -1,
            type: 'text',
            content: utils.hasDelimiters('only', options)
          }
        ]
      }
    ],
    transform: (tokens, i, j) => {
      const imageToken = tokens[i].children[j - 2];
      const attrToken = tokens[i].children[j];
      const attrs = utils.getAttrs(attrToken.content, 0, options);
      utils.addAttrs(attrs, imageToken);
      tokens[i].children.splice(j - 1, 2);
    }
  };
};