const { Thought, User } = require("../models");
const { populate } = require("../models/User");

const thoughtController = {
// get all thoughts
getAllThoughts(req, res) {
    Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));

},
// get one thought by it's id
// create thought to a user
createThought(req, res) {
   Thought.create(req.body)
   .then((dbThoughtData) => {
       return User.findOneAndUpdate(
           {_id:req.body.userID},
           {$push:{ thoughts:dbThoughtData._id}},
           {new:true}

       )
    
   })
   .then(userData => res.json(userData))
   .catch((err) => res.status(500).json(err));
},
//update thought by it's id
updateThought(req, res) {
    Thought.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        runValidators: true,
        new: true
    }).then((thought) => {
        !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);

    }).catch((err) => res.status(500).json(err));


},

// delete a thought
deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.id})
    .then((thought) => {
        if(!thought){
            res.status(404).json({message: 'No thought with that ID'}) 


        }      
        
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$pull:{thoughts:thought._id}},
            {new:true}
 
        )
   }).then(() => res.json({message: 'User and associated apps deleted!'})).catch((err) => res.status(500).json(err));
},
// add Reaction
addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


//delete Reaction

deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionID } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


// getAllThoughts,
//   getThoughtById,
//   createThought,
//   updateThought,
//   deleteThought,
//   addReaction,
//   deleteReaction,


}

module.exports = thoughtController;