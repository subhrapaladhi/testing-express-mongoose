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
                .then(() => done())
                .catch((err) => done(err))
    })
    
    it('existing data', (done) => {
        request(app).get('/1')
                .then((res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include(insertedData)
                    done()
                })
                .catch((err) => done(err))
    })

    it('non existent data', (done) => {
        request(app).get('/2')
                .then((res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.deep.equal({err:"data not found"});
                    done()
                })
                .catch((err) => done(err))
    })

    it('invalid id', (done) => {
        request(app).get('/string')
                .then((res) => {
                    expect(res.statusCode).to.equal(500);
                    done()
                })
                .catch((err) => done(err))
    })
})