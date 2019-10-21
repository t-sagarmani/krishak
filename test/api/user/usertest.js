const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');
const conn = ('../../../../models/userAuthModel');
// const db = require('../../../db/mongoos');
const mongoose = require('mongoose');


describe('POST /register', () => {
    before((done) => {
        mongoose.connect('mongodb://127.0.0.1:27017/amritamrit', { useNewUrlParser: true })
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new nodes works', (done) => {
        request(app).post('/register')
           // .send({ firstName: 'hello', lastName: 'andikdf' })
           .send({
            firstName:"lamsala",
            lastName:"lamsala",
            userName:"lamsala",
            email:"lamsala",
            phone:"lamsala",
            location:"lamsala",
            company:"lamsala",
            userStatus:"1",
            dob:"lamsala",
            userType:"lamsala",
            password:"lamsala"
        })
            .then((res) => {
                const body = res.body;
                // expect(l.firstName).to.equal('amrit');
                expect(body).to.contain.property('token');
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
