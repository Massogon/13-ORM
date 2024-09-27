const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import Sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use(routes);

// Sync Sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})
.catch(err => {
  console.error('Error syncing database:', err);
});
