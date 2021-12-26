const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts


// /api/thoughts/:thoughtId


// /api/thoughts/:thoughtId/reactions


// /api/thoughts/:thoughtId/reactions/:reactionId


module.exports = router;
