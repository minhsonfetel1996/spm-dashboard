process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const should = chai.should();
let request = null;

describe('#login()', () => {
  before(() => {
    request = chai.request(app);
  });
  it('Test: Invalid username', (done) => {
    const loginUser = { username: 'administrator', password: 'test124456' };
    request
      .post('/api/auth/login')
      .send(loginUser)
      .withCredentials(true)
      .end((error, result) => {
        if (error) {
          done(error);
        } else {
          result.should.have.status(400);
          result.body.should.have
            .property('message')
            .eql('Invalid email or password');
          done();
        }
      });
  });
  after(() => request.close());
});

describe('#login()', () => {
  before(() => {
    request = chai.request(app);
  });
  it('Test: Invalid password', (done) => {
    const loginUser = { username: 'spm_administrator', password: 'test124456' };
    request
      .post('/api/auth/login')
      .send(loginUser)
      .withCredentials(true)
      .end((error, result) => {
        if (error) {
          done(error);
        } else {
          result.should.have.status(400);
          result.body.should.have.property('message').eql('Invalid password');
          done();
        }
      });
  });
  after(() => request.close());
});

describe('#login()', () => {
  before(() => {
    request = chai.request(app);
  });
  it('Test: Username is required or less than 3 characters', (done) => {
    const loginUser = { username: 'ab', password: 'test124456' };
    request
      .post('/api/auth/login')
      .send(loginUser)
      .withCredentials(true)
      .end((error, result) => {
        if (error) {
          done(error);
        } else {
          result.should.have.status(400);
          result.body.error[0].should.have
            .property('msg')
            .eql('Username must be at least 3 characters');
          done();
        }
      });
  });
  after(() => request.close());
});

describe('#logout()', () => {
  before(() => {
    request = chai.request(app);
  });
  it('Test: Access Denined. No Token provided', (done) => {
    request
      .post('/api/auth/logout')
      .withCredentials(true)
      .end((error, result) => {
        if (error) {
          done(error);
        } else {
          result.should.have.status(401);
          result.body.should.have
            .property('message')
            .eql('Access Denied. No token provided');
          done();
        }
      });
  });
  after(() => request.close());
});
