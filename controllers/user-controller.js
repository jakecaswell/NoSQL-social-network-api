const { User, Thought } = require('../models');

const userController = {
  // this object is a module exported to routes so each method can be called,
  // make sure to import all of these methods into the user routes file to access them.
  // I left get all as an example

  // get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single user by id
  getUser({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        // if no user with this id send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id D:' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err))
  },
  // update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
      .then(dbUpdatedUser => {
        if (!dbUpdatedUser) {
          res.status(404).json({ message: 'No user found with this id D:' })
          return;
        }
        res.json(dbUpdatedUser);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id D:' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // add friend to friend list
  addFriend() {

  },
  // remove friend from friend list
  deleteFriend() {

  }
};

module.exports = userController;
