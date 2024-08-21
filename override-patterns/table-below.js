const utils = require('../utils.js');

module.exports = function(options) {
    
  return {
  /**
     * | h1 |
     * | -- |
     * | c1 |
     *
     * {.c}
     */
    name: 'table with attributes directly below',
    tests: [
      {
      // let this token be i, such that for-loop continues at
      // next token after tokens.splice
        shift: 0,
        type: 'table_close'
      }
    ],
    transform: (tokens, i) => {
      let indexOfLastRow;
      for (let j = i; i >=0; j -= 1) {
        if (tokens[j].type === 'tr_open') {
          indexOfLastRow = j;
          break;
        }
      }
      if (!indexOfLastRow) {
        return;
      }
      let attrs;
      let indexOfLastRowClosingTag;
      for (let j = indexOfLastRow + 1; j < tokens.length; j += 1) {
        const token = tokens[j];
        if (token.type === 'tr_close') {
          indexOfLastRowClosingTag = j;
          continue;
        }
        if (token.type === 'table_close') {
          break;
        }
        if (['td_open', 'td_close', 'tbody_close', 'table_close'].includes(token.type)) {
          continue;
        }
        if (token.type === 'inline') {
          if (token.content && !attrs && utils.hasDelimiters('only', options)(token.content)) {
            attrs = utils.getAttrs(token.content, 0, options);
          }
          continue;
        }
        return;
      }

      if (attrs && indexOfLastRowClosingTag) {
        const tableOpen = utils.getMatchingOpeningToken(tokens, i);
        // add attributes
        utils.addAttrs(attrs, tableOpen);
        // remove <p>{.c}</p>
        tokens.splice(indexOfLastRow, indexOfLastRowClosingTag - indexOfLastRow + 1);
      }
    }
  };
};