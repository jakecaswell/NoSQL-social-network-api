const { User, Thought } = require('../models');

const userController = {
  // this object is a module exported to routes so each method can be called,
  // make sure to import all of these methods into the user routes file to access them.
  // I left get all as an example

  // get all users
  getUsers(req, res) {
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
  
  // create a new user
  
  // update a user
  
  // delete user (BONUS: and delete associated thoughts)
  
  // add friend to friend list
  
  // remove friend from friend list
  
};

module.exports = userController;
