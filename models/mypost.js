const mongoose = require('mongoose');


const post = mongoose.model('Posts', {

    postImage: {
        type: String
    },
    postDescription: {
        type: String
    },
    createdAt:{
        type:Date, 
    },
    location: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    likes: {
        type: Number,
        default:0,
    },
    comments: [{
        comment: {
            type: String,
            required: true
        }
    }]






});
module.exports = post