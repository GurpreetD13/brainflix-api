const express = require('express');
const app = express();
const cors = require('cors');

// Middleware:

// will need the following bodyParser to access/parse request.body of POST requests
app.use(express.json());

// will need to allow cross origin resource sharing
// app.use(cors());

// will need to publically serve static assets/image from server which
app.use(express.static('public'))



// Routes
const videosRoutes = require('./routes/videos');
app.use('/videos', videosRoutes);



// server Listening for requests on port 8080
app.listen(8080, () => { console.log("BrainFlix server is running on port 8080") });