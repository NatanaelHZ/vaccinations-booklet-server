const jwt = require('jsonwebtoken');
const { User } = require('../models');

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

exports.login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    res.status(404);
    return res.json({message: 'user_not_found'});
  }

  if (await user.comparePassword(password)) {
    let obj = user.toJSON()
    delete obj.password

    const token = jwt.sign(obj, process.env.SECRET, {
      expiresIn: 10000000
    });
    return res.json({ auth: true, token: token });
  } else {
    res.status(401);
    return res.json({message: 'wrong_password'});
  }
}
