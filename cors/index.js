const { createServer } = require('cors-anywhere');

createServer().listen(8080, 'localhost', function() {
  console.log('Running CORS Anywhere on localhost:8080');
});