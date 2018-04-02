const mode = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: __dirname + `/../config/.${mode}.env` });