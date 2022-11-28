const router = require('express').Router();
const { 
  getThoughts, 
  getAThought, 
  createAThought,
  updateThought,
  removeThought,
  addReaction, 
  deleteReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createAThought);

router.route('/:thoughtId').get(getAThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions/').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;