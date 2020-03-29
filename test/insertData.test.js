const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');

let basicSetup = require('./helper/basicSetup')
describe('/save route to insert data', ()=>{
    
    basicSetup();

    it('inserting a student detail with valid data', (done)=>{
        let toSendData = {_id: 14, name:'john doe', branch: 'computer science'} 
        request(app).post('/save')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.include(toSendData);
                done();
            })
            .catch((err) => done(err))
    })

    it('inserting a student without _id field', (done)=>{
        request(app).post('/save')
            .send({name:'john doe', branch: 'computer science'})
            .then((res)=>{
                expect(res.statusCode).to.equal(500)
                expect(res.body).to.be.an('object')
                done()
            })
            .catch((err) => done(err))
    })
})