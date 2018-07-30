const express = require('express');
const apiRoutes = require('./routes/api/routes');

const app = express();
const port = process.env.PORT || 3001;

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

apiRoutes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));