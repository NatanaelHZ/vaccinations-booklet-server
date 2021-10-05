const VaccineController = require('../controllers/vaccineController');

module.exports = (routes, auth) => {
  routes.post("/vaccines", auth, VaccineController.create);
};
