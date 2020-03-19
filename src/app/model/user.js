const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Address = require("./address");
const PointSchema = require("./utils/pointSchema");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: PointSchema,
      index: "2dsphere"
    },
    symptom: {
      type: Boolean,
      default: false
    },
    address: {
      type: Address
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = model("User", UserSchema);
