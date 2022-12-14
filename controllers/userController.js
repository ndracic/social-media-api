const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('reactions')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((error) => res.status(500).json(error));
  },
  // update a user
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $set: req.body },
      {new:true}
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID' })
        : res.json(user)
    )
    .catch((error) => res.status(500).json(error));
  },
  deleteUser(req,res) {
    User.findOneAndDelete(
      {_id: req.params.userId}
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this ID' })
      : res.json(user)
  )
  .catch((error) => res.status(500).json(error));
  },

addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(friendData => {
        !friendData
        ? res.status(404).json({ message: 'No friends with this ID.' })
        : res.json(friendData);
      })
      .catch(error => res.json(error));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(userData => {
        !userData
        ? res.status(404).json({ message: 'No friends thiat ID.' })
        : res.json(userData)
      })
      .catch(error => res.json(error));
    }

};
