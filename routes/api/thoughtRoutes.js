const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// router.route("/:thoughtId/reactions").post(addReaction);
// router.route("/:thoughtId/reactions/:reactionID").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;