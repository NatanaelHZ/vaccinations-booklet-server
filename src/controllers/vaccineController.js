const { Vaccine } = require('../models');

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
