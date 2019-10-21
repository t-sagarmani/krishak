const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');
const conn = ('../../../../models/productModel');
// const db = require('../../../db/mongoos');
const mongoose = require('mongoose');

describe('GET //addmyproduct', () =>{
    before((done) =>{
        mongoose.connect('mongodb://127.0.0.1:27017/resultmanagement', { useNewUrlParser: true })
        .then(()=>done())
        .catch((err)=> done(err));
    })

    it('OK, getting a new nodes works', (done)=>{
        request(app).get('/addmyproduct')
        .then((res)=>{
            const body = res.body;
            console.log(body);
            // expect(body).to.contain.property(phone);
            done();

        }).catch(eerr => console.log(eerr, done(eerr)))

    })
})