const VaccineController = require('../controllers/vaccineController');

module.exports = (routes, auth) => {
  routes.get("/vaccines", auth, VaccineController.list);
  routes.post("/vaccines", auth, VaccineController.create);
};
