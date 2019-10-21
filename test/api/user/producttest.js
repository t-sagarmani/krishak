const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');
const conn = ('../../../../models/productModel');
// const db = require('../../../db/mongoos');
const mongoose = require('mongoose');


describe('POST /addmyproduct', () => {
    before((done) => {
        mongoose.connect('mongodb://127.0.0.1:27017/amritamrit', { useNewUrlParser: true })
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new nodes works', (done) => {
        request(app).post('/addmyproduct')
           // .send({ firstName: 'hello', lastName: 'andikdf' })
           .send({            
                productName:"Khasi",
                productCategory:"Cattle",
                pricePerUnit:"10000",
                description:"Khasi is located in Dhading, approximately 20kg",
                image:"Khasi",
                quantity:"1",
                productExpireData:"12/11/1981",
                availableLocation:"Khasi",
                manufacturedLocation:"Khasi",
                discount:"20",
                uploadedBy:"5da6162a7985d60528ef2768"       
            
        })
            .then((res) => {
                const body = res.body;
                // expect(l.firstName).to.equal('amrit');
                expect(body).to.contain.property('productCategory');
                // expect(bodsy).to.contain.property('');
                // expect(body).to.contain.property('userName');
                // expect(body).to.contain.property('email'); 
                // expect(body).to.contain.property('company');
                // expect(body).to.contain.property('userStatus');
                // expect(body).to.contain.property('dob');
                // expect(body).to.contain.property('userType');
                // expect(body).to.contain.property('password');
                
                done();


            }).catch(eerr => console.log(eerr, done(eerr)))

    })
})
