const { Vaccine } = require('../models');

exports.create = async (req, res) => {
  try {
    const vaccine = { ...req.body, user_id: req.currentUser.id };

    const vaccineCreated = await Vaccine.create(vaccine);

    return res.status(201).json({ vaccine: vaccineCreated, message: 'success_create_vaccine' });
  } catch (e) {
    return res.status(400).json({
      message: e.message
    });
  }
};
