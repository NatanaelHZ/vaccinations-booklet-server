const User = require('../../src/models/user.model.js');
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
    checkHookDefined
  } = require('sequelize-test-helpers');

describe('User', () => {
    const Model = User(sequelize, dataTypes);
    const instance = new Model();

    it('Should have name user', () => {
        checkModelName(Model)('user');
    });

    it('Should have properties', () => {
        ['email', 'password', 'name'].forEach(checkPropertyExists(instance));
    })

    describe('#hooks', () => {
        it('Should have before create hook', () => {
            ['beforeCreate'].forEach(checkHookDefined(instance));
        });
    });
});

