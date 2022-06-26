import createExpressApp from 'app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import {expect} from 'chai';

const app = createExpressApp();

describe('Tests for protected route.', () => {
  it('/api/protected should return data if user authenticated', async () => {
    const stub = sinon
      .stub(jwt, 'verify')
      .returns({email: 'ok'} as unknown as void);
    await request(app)
      .get('/api/protected')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).haveOwnProperty('email', 'ok');
      });
    expect(stub.calledOnce).to.be.true;
    stub.restore();
  });
});
