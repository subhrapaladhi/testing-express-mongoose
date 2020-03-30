const   expect      = require('chai').expect;
        request     = require('supertest');
        basicSetup  = require('./helper/basicSetup')
        app         = require('../app'),
        Student     = require('../models/student');

describe('GET: /:id route to get data', () => {
    
    let insertedData;
    basicSetup();
    beforeEach((done) =>{
        insertedData = {_id: 1, name:'john doe', branch: 'computer science'}
        new Student(insertedData)
                .save()
                .then((data) => done())
                .catch((err) => done(err))
    })
    
    it('reading data for a valid student id', (done) => {
        request(app).get('/1')
                .then((res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include(insertedData)
                    done()
                })
                .catch((err) => done(err))
    })

    it('reading data for a invalid student id', (done) => {
        request(app).get('/2')
                .then((res) => {
                    expect(res.statusCode).to.equal(404);
                    done()
                })
                .catch((err) => done(err))
    })
})