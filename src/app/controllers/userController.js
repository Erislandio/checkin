const User = require("../model/user");

module.exports = {
  async store(req, res) {
    const { email, password, name, lastname, latitude, longitude } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.json({
          error: true,
          message: "Usuário já cadastrado"
        });
      }

      const lat = latitude ? latitude : 0;
      const lon = longitude ? longitude : 0;

      const location = {
        type: "Point",
        coordinates: [lon, lat]
      };

      const newUser = await User.create({
        email,
        password,
        name,
        lastname,
        location
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async index(req, res) {
    try {
      const { email } = req.query;

      const user = await User.findOne({ email }).select("-password");

      return res.status(200).json({
        user
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async searchUserByLocation(req, res) {
    try {
      const { latitude, longitude } = req.body;

      const users = await User.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 1000000
          }
        },
        symptom: true
      }).select("-password");

      return res.json({ users });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async delete(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOneAndRemove({ email });

      if (!user) {
        return res.json({
          error: true,
          message: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        user,
        deleted: true
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async editAddress(req, res) {
    try {
      const {
        postalCode,
        email,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        number
      } = req.body;

      const address = {
        postalCode,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        number
      };

      User.findOneAndUpdate({ email }, { address }).then(async () => {
        const newUser = await User.findOne({ email });

        return res.status(201).json(newUser);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async changeSymptom(req, res) {
    try {
      const { email } = req.body;

      User.findOneAndUpdate({ email }, { symptom: true }).then(async () => {
        const newUser = await User.findOne({ email });

        return res.status(201).json(newUser);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
