const VaccineController = require('../controllers/vaccineController');

module.exports = (routes) => {
  routes.post("/vaccines", VaccineController.create);
};
