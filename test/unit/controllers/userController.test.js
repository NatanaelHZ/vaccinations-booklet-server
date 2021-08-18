require('dotenv').config();
const assert = require('assert');
const { User } = require('../../../src/models');
const userController = require('../../../src/controllers/userController.js');
const sinon = require('sinon');
const { validUser } = require('../../mocks/User');
const { response } = require('express');

describe('userController', () => {
  describe("#create", () => {
    describe('valid user', () => {
      const body = {
        email: 'eduardoaikin@gmail.com',
        password: 'senhafixa'
      }

      before(() => {
        sinon.stub(User, 'create').resolves({ id: 1 });
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns create status code', async () => {
        userController.create({ }, { status (status) {
          assert.strictEqual(status, 201);
        }});
      });
      it('returns create id', async () => {
        userController.create({ }, { json (response) {
          assert.strictEqual(response.id, 1);
        }});
      });
    });

    describe('invalid null user email', () => {
      before(() => {
        sinon.stub(User, 'create').rejects('notNull Violation: user.email cannot be null');
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns fail create status code', async () => {
        userController.create({ }, { status (status) {
          assert.strictEqual(status, 400);
        }});
      });
      it('returns fail create message', async () => {
        userController.create({ }, { json (response) {
          assert.strictEqual(response.message, 'notNull Violation: user.email cannot be null');
        }});
      });
    });

    describe('invalid null user name', () => {
      before(() => {
        sinon.stub(User, 'create').rejects('notNull Violation: user.name cannot be null');
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns fail create status code', async () => {
        userController.create({ }, { status (status) {
          assert.strictEqual(status, 400);
        }});
      });
      it('returns fail create message', async () => {
        userController.create({ }, { json (response) {
          assert.strictEqual(response.message, 'notNull Violation: user.name cannot be null');
        }});
      });
    });

    describe('invalid user duplicate email', () => {
      before(() => {
        sinon.stub(User, 'create').rejects('Validation error');
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns fail create message', async () => {
        userController.create({ }, { json (response) {
          assert.strictEqual(response.message, 'Validation error');
        }});
      });
    });

  });
});