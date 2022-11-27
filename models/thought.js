const { Schema, model } = require('mongoose')

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
toJSON: {
    virtuals: true,
},  id: false
})

thoughtSchema.virtual('reactionSchema')
    .get(function() {
        return 
            this.reactions.length;
    });

const Thought = module('Thought', thoughtSchema);
module.exports = Thought;