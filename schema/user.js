// 管理员表模块
const mongoose = require("../db/connect.js");

// 管理员的登录规则
const managerSchema = mongoose.Schema({
  account: { type: String, require: true },
  password: { type: String },
});

const manager = mongoose.model("Manager", managerSchema, "managers");
// 导出的管理员表的名字和使用规则
exports.manager = manager;
