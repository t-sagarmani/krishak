const mongoose = require('mongoose');


const transactionModel = mongoose.model('Transactions', {

    price: {
        type: String
    },
    






});
module.exports = transactionModel