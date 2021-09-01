require('dotenv').config();
const assert = require('assert');
const vaccineController = require('../../../src/controllers/vaccineController.js');
const sinon = require('sinon');

describe('vaccineController', () => {
  describe("#create", () => {
    describe('valid vaccine', () => {
      const body = {
        name: 'New Vaccine',
        user_id: 1,
      }

      before(() => {
        sinon.stub().returns(body);
      });

      it('returns create status code', async () => {
        vaccineController.create({ body }, { status (status) {
          assert.strictEqual(status, 201);
        }});
      });

      it('returns create vaccine', async () => {
        vaccineController.create({ body }, { json (response) {
          assert.strictEqual(response, body);
        }});
      });

      it('returns create message', async () => {
        vaccineController.create({ body }, { json (response) {
          assert.strictEqual(response.message, 'success_create_vaccine');
        }});
      });
    });
  });
});
