import createExpressApp from 'app';
import request from 'supertest';

const app = createExpressApp();

describe('Tests for authentication middleware', () => {
  it('auth middleware should return 401 if authorization fails.', async () => {
    await request(app)
      .get('/api/protected')
      .set('Authorization', '')
      .expect(401);
  });
});
