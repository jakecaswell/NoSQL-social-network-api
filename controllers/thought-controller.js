const { Thought, User } = require('../models');

const thoughtController = {
  // this object is a module exported to routes so each method can be called,
  // make sure to import all of these methods into the thoughts routes file to access them.
  

  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(500).json(err));
  },
  // get single thought by id
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' })
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  // create a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' })
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id found' })
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },
  // remove reaction from a thought
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
