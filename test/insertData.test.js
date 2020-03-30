const   expect      = require('chai').expect;
        request     = require('supertest');
        basicSetup  = require('./helper/basicSetup')
        app         = require('../app');


describe('POST: /save route to insert data', ()=>{
    
    basicSetup();

    it('inserting a student detail with valid data', (done)=>{
        let toSendData = {_id: 1, name:'john doe', branch: 'computer science'} 
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