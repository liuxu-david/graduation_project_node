const { mongoose } = require("../db/connect");

const StudentSchema = new mongoose.Schema({
  account: { type: String },
  password: { type: String, default: "123456" },
  classin: { type: String },
  grade: { type: Number },
  addexam: { type: Number },
  firstexam: { type: Number },
  name: { type: String },
  secondexam: { type: Number, default: 0 },
  thirdexam: { type: Number, default: 0 },
  allexam: { type: Number, default: 0 },
  state: { type: String, default: "未报名" },
  choosestate: { type: Number, default: 0 },
});

module.exports = mongoose.model("Student", StudentSchema);
