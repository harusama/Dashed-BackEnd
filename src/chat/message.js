const moment = require('moment');

function generateMessage(from, text, color) {
   return {
      from,
      text,
      color,
      createdAt: moment().valueOf()
   };
}

module.exports = {
   generateMessage
};