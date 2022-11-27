const { Schema, model } = require ('mongoose')
const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            default: [],
            ref: "thoughts"
        }
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
      ],

toJSON: {
    virtuals: true,
},
id: false,
});

userSchema
    .virtual("friendCount")
    .get(function(){
        return
            this.friends.length;
         })

const User = model("User", userSchema);
module.exports = User