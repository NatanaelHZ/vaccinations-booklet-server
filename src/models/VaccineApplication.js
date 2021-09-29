'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class VaccineApplication extends Model {}

  VaccineApplication.init({
    schedule_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    vaccine_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    is_applied: {
      type: Sequelize.BOOLEAN,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },{
    sequelize,
    tableName: 'vaccine_applications',
  });

  VaccineApplication.associate = models => {
    VaccineApplication.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'vaccine'
    });
  }

  return VaccineApplication;
};
