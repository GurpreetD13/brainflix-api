const express = require('express');
const app = express();
const cors = require('cors');

// Middleware




// will need the following bodyParser to access/parse request.body of POST requests
// app.use(express.json());




// allow cross origin resource sharing
// app.use(cors());





// Routes
const videosRoutes = require('./routes/videos');
app.use('/videos', videosRoutes);


// server Listening for requests on port 8080
app.listen(8080, () => { console.log("BrainFlix server is running on port 8080") });