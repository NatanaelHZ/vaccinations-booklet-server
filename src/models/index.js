const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Vaccine = require("./Vaccine.js")(sequelize, Sequelize);
db.VaccineApplication = require("./VaccineApplication.js")(sequelize, Sequelize);

module.exports = db;
