import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'

chai.use(chaiHttp)

const expect = chai.expect

describe('apiRoute', () => {
  it('should respond with 200 and title Order Api', async () => {
    return chai
      .request(app)
      .get('/api')
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.title).to.be.equal('Order API')
      })
  })
})
