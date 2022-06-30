const User = require("../models/User");
const jwt = require("jsonwebtoken");

const {JWT_KEY} = require("../config");

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

      res.status(201).send({ msg: "User added Successfuly" });
    } catch (err) {
      res.status(500).send({ errors: "Internal Server ERROR" });
    }
  }, // Add new User

  auth: async (req, res) => {
    try {
      const { phone_number, password } = req.body;
      if (!phone_number || !password) {
        return res.status(401).send({ errors: "Inavluid Phone Number" });
      }

      const token = jwt.sign({ phone_number }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: 15,
      });
      console.log("token:", token);

      res.cookie("token", token, { maxAge: 15 * 1000 });
      res.status(201).send({ msg: "Successfull", "auth-token": token });
    } catch (err) {
      res.status(500).send({ errors: `Internal Server ERROR : ${err}` });
    }
  }, // Return Token
};
