const mongoose = require("mongoose");

const remakEnum = [
  "Call Back",
  "Interested",
  "Not Interested",
  "Follow Up Next Month",
  "Demo time",
];
const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid name.`,
      },
    },
    empId: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile no is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[6-9]\d{9}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid Indian mobile number.`,
      },
    },
    assignTo: {
      type: String,
    },
    location: String,
    address: String,

    status: {
      type: String,
      enum: remakEnum,
    },
    subStatus: String,
    remarks: [
      { val: { type: String }, time: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("client", clientSchema);
