const mongoose = require('mongoose');


const categoryModel = mongoose.model('Products', {

    productCategory:{
        type:String
    },
});
module.exports = categoryModel