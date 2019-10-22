const mongoose = require('mongoose');


const productModel = mongoose.model('Products', {

    productName: {
        type: String
    },
    productCategory: {
        type: String
    },
    pricePerUnit: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    discount: {
        type: String
    },
    quantity: {
        type: String
    },
    availableLocation: {
        type: String
    },
    manufacturedLocation: {
        type: String
    },
    quantity: {
        type: String
    },
    productExpireData: {
        type: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
});
module.exports = productModel