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
        name: 'test',
        email: 'test@mail.com',
        password: 'password'
      }

      before(() => {
        sinon.stub(User, 'create').resolves({ id: 1 });
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns create status code', async () => {
        userController.create({ body }, { status (status) {
          assert.strictEqual(status, 201);
        }});
      });
      it('returns create id', async () => {
        userController.create({ body }, { json (response) {
          assert.strictEqual(response.id, 1);
        }});
      });
      it('returns create message', async () => {
        userController.create({ body }, { json (response) {
          assert.strictEqual(response.message, 'success_create_user');
        }});
      });
    });

    describe('invalid null user email', () => {
      const body = {
        name: 'test',
        email: '',
        password: 'password'
      }

      before(() => {
        sinon.stub(User, 'create').rejects('notNull Violation: user.email cannot be null');
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns fail create status code', async () => {
        userController.create({ body }, { status (status) {
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
      const body = {
        name: '',
        email: 'test@mail.com',
        password: 'password'
      }

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
        userController.create({ body }, { json (response) {
          assert.strictEqual(response.message, 'notNull Violation: user.name cannot be null');
        }});
      });
    });

    describe('invalid user duplicate email', () => {
      const body = {
        name: 'test',
        email: 'test@mail.com',
        password: 'password'
      }

      before(() => {
        sinon.stub(User, 'create').rejects('Validation error');
      });
      
      after(() => {
        User.create.restore();
      });

      it('returns fail create message', async () => {
        userController.create({ body }, { json (response) {
          assert.strictEqual(response.message, 'Validation error');
        }});
      });
    });

  });
});