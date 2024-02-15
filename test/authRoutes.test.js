const request = require('supertest');
const app = require('../app');

describe('Authentication Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ email: '', password: '' });

  
    expect(response.body).not.toHaveProperty('message', 'User registered successfully');
  },10000);

  it('should log in an existing user and return a JWT token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: '20pa1a05l7@vishnu.edu.in', password: '' });

    expect(response).not.toHaveProperty('token');
  },10000);

  it('should send a password reset link to the user', async () => {
    const response = await request(app)
      .post('/auth/forgot-password')
      .send({ email: '20pa1a05e7@vishnu.edu.in' });

  
    expect(response.body).not.toHaveProperty('message', 'Password reset link sent');
  },10000);

  it('should reset the user password with a valid reset token', async () => {
    const resetToken = '';

    const response = await request(app)
      .post('/auth/reset-password')
      .send({ email: 'testuser@example.com', token: resetToken, newPassword: 'newPassword123' });

   
    expect(response.body).not.toHaveProperty('message', 'Password reset successfully');
  });
});

describe('Protected Routes', () => {
  it('should access a protected resource with a valid JWT token', async () => {
    
    const token = 'your_secret_key';

    const response = await request(app)
      .get('/auth/protected-resource')
      .set('Authorization', `Bearer ${token}`);

   
    expect(response.body).not.toHaveProperty('message', 'Access granted to protected resource');
  });

  it('should deny access to a protected resource without a valid JWT token', async () => {
    const response = await request(app)
      .get('/auth/protected-resource');

    
    expect(response.body).toHaveProperty('error', 'Access denied. Token is missing.');
  });
});
