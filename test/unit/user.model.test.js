const { expect } = require('chai')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize } = require('sequelize-test-helpers')

describe('User', () => {
  const { DataTypes } = Sequelize

  const UserFactory = proxyquire('../../src/models/User.js', {
    sequelize: Sequelize
  })

  let User

  before(() => {
    User = UserFactory(sequelize, DataTypes)
  })

  after(() => {
    User.init.resetHistory()
  })

  it('called User.init with the correct parameters', () => {
    User.init.calledWith(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'users'
      }
    )
  })
})
