// 管理员表模块
const { mongoose } = require("../db/connect.js");

// 管理员的登录规则
const ManagerSchema = new mongoose.Schema({
  account: { type: String },
  password: { type: String, default: "123456" },
});

module.exports = mongoose.model("Manager", ManagerSchema);
