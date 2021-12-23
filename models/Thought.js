const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
// build schema here
);


//virtual for reactionCount

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
