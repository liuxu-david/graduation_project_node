const { mongoose } = require("../db/connect");

// 定义messeage的规则
const MessageSchema = new mongoose.Schema({
  title: { type: String, default: "默认标题" },
  content: { type: String },
});

module.exports = mongoose.model("Message", MessageSchema);
