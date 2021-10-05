const VaccineController = require('../controllers/vaccineController');

module.exports = (routes) => {
  routes.get("/vaccines", VaccineController.list);
};

