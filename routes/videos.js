const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/videos' route 

// First: Function to get All videos data Array from videos.json data file by reading and parsing JSON file
const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.JSON');
    return JSON.parse(videos);
};


// app.route('/')









// handle GET Single requested videoDetails object where dynamic URL/route = videoId using req.params.id to find video if exists
router.get('/:videoId', (req, res) => {

    const requestedVideo = getVideos().find(video => video.id === req.params.videoId);

    if (!requestedVideo) {
        res.status(404).json({ message: 'Video does not exist' })
        return;
    }
    res.status(200).json(requestedVideo);
});



module.exports = router;