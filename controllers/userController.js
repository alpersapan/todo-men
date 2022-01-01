const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).redirect("/user/login");
  } catch (error) {
    res.status(200).redirect("/user/register");
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            req.session.userName = user.name;
            res.status(200).redirect("/todos");
          }
        });
      }
    });
  } catch (error) {
    res.status(200).redirect("/user/login");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).redirect("/user/login");
  });
};
