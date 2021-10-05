require('dotenv').config();
const assert = require('assert');
const { Vaccine } = require('../../../src/models');
const vaccineController = require('../../../src/controllers/vaccineController.js');
const sinon = require('sinon');
const { generateValidVaccines } = require('../../mocks/Vaccine');

describe('vaccineController', () => {
  describe("#list", () => {
    describe('with valid password', () => {
      const query = {
        page: 1,
        size: 10
      };
      const req = { user: { id: 1 }, query };

      before(() => {
        sinon.stub(Vaccine, 'count').resolves(12);
        sinon.stub(Vaccine, 'findAll').resolves(generateValidVaccines(10));
      });
      
      after(() => {
        Vaccine.count.restore();
        Vaccine.findAll.restore();
      });

      it('returns valid vaccines', async () => {
        vaccineController.list(req, { status () {}, json (response) {
          assert.strictEqual(response, {
            docs: generateValidVaccines(10),
            pagination: {
              page: 1,
              perPage: 10,
              total: 12
            }
          });
        }});
      });

      it('returns 200 statusCode', async () => {
        vaccineController.list(req, { json () {}, status (statusCode) {
          assert.strictEqual(statusCode, 200);
        }});
      });
    });
  });

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
