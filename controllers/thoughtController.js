const { User, Thought } = require('../models');

module.exports = {
// GET thoughts 
  getThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },
// GET thought
  getAThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
  },
// POST thought
  createAThought({ params, body }, res) {
    console.log(params);
    Thought.create(body)
        .then(thoughtData => {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true, runValidators: true }
            )
            console.log(thoughtData);
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
  },
// PUT 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $set: body },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        !thoughtData
          ? res.status(404).json({ message: 'No thought by that ID.' })
          : res.json(thoughtData)
      })
      .catch(err => res.json(err));
  },
// DELETE tht
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then((thoughtData) => 
    !thoughtData
      ? res.status(404).json({ message: 'No thought in that ID.' })
      : User.deleteMany({ _id: { $in: thoughtData.user }})
      )
      .then(() => res.json({ message: 'Thought removed.' }))
      .catch((err) => res.status(500).json(err));
  },
// POST reaction
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No Thought found with this id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
// DELETE 
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: {reactionId: params.reactionId } } },
      { new: true }
    )
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err));
  }

};