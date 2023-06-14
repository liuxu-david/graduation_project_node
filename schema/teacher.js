const { mongoose } = require("../db/connect");

const TeacherSchema = new mongoose.Schema({
  account: { type: String, required: true },
  password: { type: String, default: "123456" },
  name: { type: String },
  guide: { type: Number, default: 8 },
  position: { type: String },
  introduction: { type: String },
  applytable: { type: Array },
  selection: { type: Array },
  student: { type: Array },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
