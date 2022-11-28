const { Schema, model, Types } = require('mongoose')
//require reaction schema
const reactionSchema = new Schema (
    {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        reactionBody: {
          type: String,
          required: true,
          maxLength: 280,
        },
        username: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
      },
      {
      toJSON: {
        virtuals: true,
        getters: true
    },
        id: false,
})

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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;