const User = require("../models/User");

module.exports = {
  def: (req, res) => {
    res.send({ msg: "Hello" });
  },

  addUser: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        country_code,
        phone_number,
        gender,
        birth_date,
        avatar,
        email,
      } = req.body;

      const user = new User({
        first_name,
        last_name,
        country_code,
        phone_number,
        gender,
        birth_date,
        avatar,
        email,
      });

      await user.save().catch((err) => {
        res.status(500).send({ errors: `Saving in DB ERROR : ${err}` });
      });
    } catch (err) {
      res.status(500).send({ errors: "Internal Server ERROR" });
    }
  }, // Add new User
};
