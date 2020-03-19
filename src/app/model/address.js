const { Schema } = require("mongoose");

const AddressSchema = new Schema(
  {
    postalCode: {
      type: String,
      required: true
    },
    logradouro: {
      type: String,
      required: true
    },
    complemento: {
      type: String
    },
    bairro: {
      type: String,
      required: true
    },
    localidade: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = AddressSchema;
