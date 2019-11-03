const mongoose = require('mongoose');

const categoryModel = mongoose.model('Category', {

    name:{
        type:String
    },
});
module.exports = categoryModel