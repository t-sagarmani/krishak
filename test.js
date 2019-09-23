const myposts = require('./models/mypost');
const productmodel = require('./models/productmodel');
const transactionmodel = require('./models/transactionmodel');
const userauthmodel = require('./models/userauthmodel');
const mongoose = require('mongoose');



//creating database for testing
const url = 'mongodb://localhost:27017/apitesting';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});

//schema test of feedback
describe('mypost Schema test', () => {
    // the code below is for insert testing
    it('Add mypost testing', () => {
        const mypost = {
            'postImage': 'hello',
            'postDescription': 'hh',
            'location': 'nepal',
            'userId': '5d87bb746877731ec407d8b0'
                // 'comments': 'comm'

        };

        return myposts.create(mypost)
            .then((j) => {
                expect(j.location).toEqual('nepal');
            });
    });
});

//schema test of feedback
describe('userAuth Schema test', () => {
    // the code below is for insert testing
    it('Add auth testing', () => {
        const userr = {
            'firstName': 'hello',
            'lastName': 'hh',
            'userName': 'hello',
            'email': 'hello',
            'phone': 'hh',
            'location': 'nepal',
            'company': 'hello',
            'userStatus': 'hh',
            'userType': 'nepal',
            'password': 'hello',

            // 'comments': 'comm'

        };

        return userauthmodel.create(userr)
            .then((j) => {
                expect(j.userName).toEqual('hello');
            });
    });
});





describe('productmodel Schema test', () => {
    // the code below is for insert testing
    it(' productmodel testing', () => {
        const pro = {
            'productName': 'kauli',
            'productCategory': 'tarkari',
            'pricePerUnit': '20',
            'description': 'tarkari',
            'productCategory': 'tarkari',
            'image': 'syau',
            'uploadedBy': '5d87bb746877731ec407d8b0',

            // 'comments': 'comm'

        };

        return productmodel.create(pro)
            .then((j) => {
                expect(j.productName).toEqual('kauli');
            });
    });
});