const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('reactions')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
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
    .catch((err) => res.status(500).json(err));
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
  .catch((err) => res.status(500).json(err));
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
      .catch(err => res.json(err));
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
      .catch(err => res.json(err));
    }

};
