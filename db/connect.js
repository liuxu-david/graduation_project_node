const mongoose = require("mongoose");

// 终端提示警告
mongoose.set("strictQuery", true);
// 连接graduation数据库
mongoose.connect("mongodb://localhost:27017/graduation");

mongoose.connection.on("connected", () => {
  console.log("我是mongodb数据库 我连接了 连接成功!");
});

mongoose.connection.on("disconected", () => {
  console.log("disconected  数据库连接 断开");
});

mongoose.connection.on("error", () => {
  console.log("mongoose error");
});

// 向外共享数据库连接对象
module.exports = mongoose;
