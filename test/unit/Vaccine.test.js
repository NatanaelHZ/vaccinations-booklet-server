const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')

describe('Vaccine', () => {
  const { DataTypes } = Sequelize

  const VaccineFactory = proxyquire('../../src/models/Vaccine.js', {
    sequelize: Sequelize
  })

  let Vaccine

  before(() => {
    Vaccine = VaccineFactory(sequelize, DataTypes)
  })

  after(() => {
    Vaccine.init.resetHistory()
  })

  it('called Vaccine.init with the correct parameters', () => {
    Vaccine.init.calledWith(
      {
        name: DataTypes.STRING,
        interval: DataTypes.STRING,
        user_id: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: 'vaccines'
      }
    )
  })
});
