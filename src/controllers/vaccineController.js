const { Vaccine } = require('../models');

exports.create = async (req, res) => {
  try {
    const vaccine = await Vaccine.create(req.body);
    
    return res.status(201).json({ message: 'success_create_vaccine' });
  } catch (e) {
    return res.status(400).json({
      message: e.message
    });
  }
};
