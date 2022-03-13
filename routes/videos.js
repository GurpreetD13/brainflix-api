const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// '/videos' route 

// First: Function to get All videos data Array from videos.json data file by reading and parsing JSON file
const getVideos = () => {
    const videos = fs.readFileSync('./data/videos.JSON');
    return JSON.parse(videos);
};

// Function to save videos.json data which will be used in handling video POST requests later
const saveVideos = (updatedVideos) => {
    fs.writeFileSync('./data/videos.json', JSON.stringify(updatedVideos))
};


// '/videos/' route
router.route('/')
    // GET All videos by mapping into a condensed format
    .get((req, res) => {

        const formattedVideos = getVideos()
            .map(video => {
                return {
                    "id": video.id,
                    "title": video.title,
                    "channel": video.channel,
                    "image": video.image,
                }
            });
        res.status(200).json(formattedVideos);
    })

    .post((req, res) => {
        const newVideo = {
            "id": uuidv4(),
            "title": req.body.title,
            "channel": req.body.channel,
            "image": req.body.image,
            "description": req.body.description,
            "views": 0,
            "likes": 0,
            "duration": req.body.duration,
            "video": req.body.video,
            "timestamp": Date.now(),
            "comments": [],
        }
        // add/push newVideo to All videos data array and save updatedVideos data array
        let updatedVideos = getVideos();
        updatedVideos.push(newVideo);

        saveVideos(updatedVideos);

        res.status(201).json(newVideo);
    });


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