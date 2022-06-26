import createExpressApp from 'app';
import {expect} from 'chai';
import mongoose, {mongo} from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import sinon from 'sinon';
import User from 'models/user';
import jwt from 'jsonwebtoken';

const app = createExpressApp();

describe('Tests for Auth routes & controllers', () => {
  before(async () => {
    await mongoose.connect(<string>process.env.MONGODB_URL, {
      dbName: 'test-db',
    });
  });
  after(async () => {
    await mongoose.disconnect();
  });

  it('/signup controller should return 400 with errors on  validation errors', async () => {
    await request(app)
      .post('/auth/signup')
      .send({
        email: '',
        password: '',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('errors').is.lengthOf(2);
      });
  });
  it('/signup should return error with message if user cannot be created.', async () => {
    await mongoose.disconnect();
    try {
      await mongoose.connect('', {connectTimeoutMS: 200}); // No database connection established
      //eslint-disable-next-line
    } catch (_) {}
    await request(app)
      .post('/auth/signup')
      .send({
        email: 'correct-email@email.com',
        password: '123mnnDx.4213fa$',
      })
      .expect(500)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('error');
      });
    await mongoose.connect(<string>process.env.MONGODB_URL, {
      dbName: 'test-db',
    });
  });
  it('/signup should hash password and return success if user succesfully created.', async () => {
    const stub = sinon.stub(bcrypt, 'hash').resolves('pw');
    const password = '123mnnDx.4213fa$';
    await request(app)
      .post('/auth/signup')
      .send({
        email: 'correct-email@email.com',
        password,
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'SUCCESS');
        expect(response.body).not.haveOwnProperty('errors');
      });

    expect(stub.calledOnceWith(password, 12)).to.be.true;

    stub.restore();
  });
  it('/login should return 400 if validation errors occur.', async () => {
    await request(app)
      .post('/auth/login')
      .send({
        email: '',
        password: '',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('errors').is.lengthOf(2);
      });
  });
  it('/login should return 401 if username or password is invalid', async () => {
    const sandbox = sinon.createSandbox();

    const stub = sandbox.stub(User, 'findOne').resolves(null);
    await request(app)
      .post('/auth/login')
      .send({
        email: 'non-existing-user@email.com',
        password: '123.;-*1abD',
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('error', 'User not found.');
      });

    stub.restore();
    sandbox.stub(User, 'findOne').resolves({password: 'dumy-pw'});
    sandbox.stub(bcrypt, 'compare').resolves(false);
    await request(app)
      .post('/auth/login')
      .send({
        email: 'non-existing-user@email.com',
        password: '123.;-*1abD',
      })
      .expect(401)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('error', 'Invalid password.');
      });
    sandbox.restore();
  });
  it('/login should return 500 if any error occurs.', async () => {
    const sandbox = sinon.createSandbox();

    const stub = sandbox
      .stub(User, 'findOne')
      .rejects({message: 'findOne-error'});
    sandbox.stub(bcrypt, 'compare').rejects({message: 'bcrypt-error'});

    await request(app)
      .post('/auth/login')
      .send({
        email: 'non-existing-user@email.com',
        password: '123.;-*1abD',
      })
      .expect(500)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('error', 'findOne-error');
      });
    stub.restore();
    sandbox.stub(User, 'findOne').resolves({password: '123'});

    await request(app)
      .post('/auth/login')
      .send({
        email: 'non-existing-user@email.com',
        password: '123.;-*1abD',
      })
      .expect(500)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'FAIL');
        expect(response.body).haveOwnProperty('error', 'bcrypt-error');
      });

    sandbox.restore();
  });
  it('/login should return 200 with token on successfull authentication.', async () => {
    const sandbox = sinon.createSandbox();

    sandbox.stub(User, 'findOne').resolves({password: ''});
    sandbox.stub(bcrypt, 'compare').resolves(true);
    const stub = sandbox.stub(jwt, 'sign').resolves('ok');

    await request(app)
      .post('/auth/login')
      .send({
        email: 'non-existing-user@email.com',
        password: '123.;-*1abD',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('message', 'SUCCESS');
        expect(response.body).not.haveOwnProperty('error');
        expect(response.body).haveOwnProperty('token');
      });

    expect(stub.calledOnce).to.be.true;

    sandbox.restore();
  });
});
