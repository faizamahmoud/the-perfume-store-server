
const { connect } = require('./config/db.connection')
const createServer = require('./utils/server')
const PORT = process.env.PORT || 4000;


// Connect to MongoDB database
connect().then(() => {
    console.log('Connected to MongoDB!');
    
    // Create and start Express.js server
    const app = createServer();
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });