const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../app'),
        Student     = require('../models/student');

describe('PUT: /:id route to update data', () => {
    basicSetup();
    beforeEach((done) => {
        new Student({_id: 1, name:'john doe', branch: 'computer science'})
            .save()
            .then(() => done())
            .catch((err) => done(err))
    })

    it('existing data', (done) => {
        request(app).put('/1')
                .send({name:'john doe updated', branch: 'updated branch'})
                .then((res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.include({_id: 1, name:'john doe updated', branch: 'updated branch'})
                    done()
                })
                .catch((err) => done(err))
    })

    it('non existent data', (done) => {
        request(app).put('/2')
                .send({name:'john doe updated', branch: 'updated branch'})
                .then((res) => {
                    expect(res.statusCode).to.equal(404)
                    expect(res.body).to.deep.equal({err: "no data found"})
                    done()
                })
                .catch((err) => done(err))
    })

    it('invalid id', (done) => {
        request(app).put('/string')
                .send({name:'john doe updated', branch: 'updated branch'})
                .then((res) => {
                    expect(res.statusCode).to.equal(500)
                    done()
                })
                .catch((err) => done(err))
    })

})