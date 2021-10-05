require('dotenv').config();
const assert = require('assert');
const { Vaccine } = require('../../../src/models');
const vaccineController = require('../../../src/controllers/vaccineController.js');
const sinon = require('sinon');

describe('vaccineController', () => {
  describe("#create", () => {
    describe('valid vaccine', () => {
      const body = {
        name: 'vaccine test',
        user_id: 1
      }

      before(() => {
        sinon.stub(Vaccine, 'create').resolves({ id: 1 });
      });
      
      after(() => {
        Vaccine.create.restore();
      });

      it('returns create status code', async () => {
        vaccineController.create({ body }, { status (status) {
          assert.strictEqual(status, 201);
        }});
      });

      it('returns create id', async () => {
        vaccineController.create({ body }, { json (response) {
          assert.strictEqual(response.id, 1);
        }});
      });

      it('returns create message', async () => {
        vaccineController.create({ body }, { json (response) {
          assert.strictEqual(response.message, 'success_create_vaccine');
        }});
      });
    });

    describe('invalid null name', () => {
      const body = {
        name: '',
        user_id: 1
      }

      before(() => {
        sinon.stub(Vaccine, 'create').rejects('notNull Violation: Vaccine.name cannot be null');
      });
      
      after(() => {
        Vaccine.create.restore();
      });

      it('returns fail create status code', async () => {
        vaccineController.create({ body }, { status (status) {
          assert.strictEqual(status, 400);
        }});
      });

      it('returns fail create message', async () => {
        vaccineController.create({ }, { json (response) {
          assert.strictEqual(response.message, 'notNull Violation: Vaccine.name cannot be null');
        }});
      });
    });

    describe('invalid null user_id', () => {
      const body = {
        name: 'vaccine'
      }

      before(() => {
        sinon.stub(Vaccine, 'create').rejects('notNull Violation: Vaccine.user_id cannot be null');
      });
      
      after(() => {
        Vaccine.create.restore();
      });

      it('returns fail create status code', async () => {
        vaccineController.create({ body }, { status (status) {
          assert.strictEqual(status, 400);
        }});
      });

      it('returns fail create message', async () => {
        vaccineController.create({ }, { json (response) {
          assert.strictEqual(response.message, 'notNull Violation: Vaccine.user_id cannot be null');
        }});
      });
    });
  });
});
