const { mongoose } = require("../db/connect.js");

const ComplaintSchema = new mongoose.Schema({
  account: { type: String },
  name: { type: String },
  id: { type: String },
  content: { type: String },
  complaintstate: { type: String, default: "未处理" },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
