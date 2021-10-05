const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')

describe('VaccineApplication', () => {
  const { DataTypes } = Sequelize

  const VaccineApplicationFactory = proxyquire('../../src/models/VaccineApplication.js', {
    sequelize: Sequelize
  })

  let VaccineApplication

  before(() => {
    VaccineApplication = VaccineApplicationFactory(sequelize, DataTypes)
  })

  after(() => {
    VaccineApplication.init.resetHistory()
  })

  it('called VaccineApplication.init with the correct parameters', () => {
    VaccineApplication.init.calledWith(
      {
        schedule_date: DataTypes.STRING,
        is_applied: DataTypes.BOOLEAN,
        vaccine_id: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: 'vaccine_applications'
      }
    )
  })
});
