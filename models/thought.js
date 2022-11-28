const { Schema, model, Types } = require('mongoose')
//require reaction schema
const reactionSchema = require('./Reaction')

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
    //points to reaction schema
    reactions: [reactionSchema]
},
{
    toJSON: {
    virtuals: true,
},  id: false
})

thoughtSchema.virtual('reactionSchema').get(function() {
        return this.reactions.length;
    });

const Thought = module('Thought', thoughtSchema);

module.exports = Thought;