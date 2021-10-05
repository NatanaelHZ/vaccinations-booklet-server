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
});
