const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: false
    }
})

const User= mongoose.model('users', userSchema);

module.exports=User;
