const utils = require('../utils.js');


module.exports = function (options) {
  return {
    /**
     * horizontal rule ---\{#id}
     */
    name: 'horizontal rule with attrs on newline',
    tests: [
      {
        shift: 0,
        type: 'hr'
      },
      {
        shift: 1,
        type: 'paragraph_open'
      },
      {
        shift: 2,
        type: 'inline',
        content: utils.hasDelimiters('only', options)
      },
      {
        shift: 3,
        type: 'paragraph_close'
      }
    ],
    transform: (tokens, i) => {
      const token = tokens[i];
      token.type = 'hr';
      token.tag = 'hr';
      token.nesting = 0;
      const content = tokens[i + 2].content;
      const attrs = utils.getAttrs(content, 0, options);
      utils.addAttrs(attrs, token);
      tokens.splice(i + 1, 3);
    }
  };
};