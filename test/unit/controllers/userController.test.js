require('dotenv').config();
const assert = require('assert');
const { User } = require('../../../src/models');
const userController = require('../../../src/controllers/userController.js');
const sinon = require('sinon');
const { validUser } = require('../../mocks/User');
const jwt = require('jsonwebtoken');

describe('userController', () => {
  describe("#login", () => {
    describe('with valid login', () => {
      const body = {
        email: 'eduardoaikin@gmail.com',
        password: 'senhafixa'
      }

      before(() => {
        sinon.stub(User, 'findOne').resolves(validUser());
      });
      
      after(() => {
        User.findOne.restore();
      });

      it('returns valid jwt', async () => {
        userController.login({ body }, { json (response) {
          jwt.verify(response.token, process.env.SECRET,  (err) => {
            assert(!err)
          });
        }});
      });
    });

    describe('with invalid email', () => {
      const body = {
        email: 'eduar',
        password: 'senhafixa'
      }

      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });
      
      after(() => {
        User.findOne.restore();
      });

      it('returns user_not_found message', async () => {
        userController.login({ body }, { status () {}, json (response) {
          assert.strictEqual(response.message, 'user_not_found');
        }});
      });

      it('return statusCode 404', async () => {
        userController.login({ body }, { json () {}, status (statusCode) {
          assert.strictEqual(statusCode, 404);
        }});
      });
    });

    describe('with valid password', () => {
      const body = {
        email: 'eduardoaikin@gmail.com',
        password: 'outrasenha'
      }

      before(() => {
        sinon.stub(User, 'findOne').resolves(validUser());
      });
      
      after(() => {
        User.findOne.restore();
      });

      it('returns wrong_password message', async () => {
        userController.login({ body }, { status () {}, json (response) {
          assert.strictEqual(response.message, 'wrong_password');
        }});
      });

      it('returns 401 statusCode', async () => {
        userController.login({ body }, { json () {}, status (statusCode) {
          assert.strictEqual(statusCode, 401);
        }});
      });
    });
  });
});
