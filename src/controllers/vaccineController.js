const { Vaccine } = require('../models');
//const { VaccineApplication } = require('../models');

exports.list = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.size);
    const total = await Vaccine.count();
    const docs = await Vaccine.findAll({
      offset: (page - 1)*perPage,
      limit: perPage,
      where: {
        user_id: req.currentUser.id
      }
    });

    return res.status(200).json({
      docs,
      pagination: {
        page,
        total,
        perPage
      }
    });
  } catch (e) {
    return res.status(400).json({
      message: 'unknown_error'
    });
  }
};

exports.create = async (req, res) => {
  try {
    const vaccine = { name: req.body.name, user_id: req.currentUser.id };
    const vaccineApplication = [...req.body.applications ];

    console.log(`Não Serializado ${JSON.stringify(vaccineApplication)}`);

    const vaccineCreated = await Vaccine.create(vaccine);

    const applications = vaccineApplication.map(application => (
      { ...application,  vaccine_id: vaccineCreated.id }));

    console.log(`Serializado ${JSON.stringify(applications)}`);
    //const applicationsCreated = await VaccineApplication.bulkCreate(applications);

    return res.status(201).json({ 
      vaccine: vaccineCreated,
      applications: {},
      message: 'success_create_vaccine' 
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message
    });
  }
};
