const { User } = require("../models");

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      id: user.id,
      message: 'success_create_user'
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message
    });
  }
};
