const mongoose = require("mongoose");

// 终端提示警告
mongoose.set("strictQuery", true);
// 连接graduation数据库
mongoose
  .connect("mongodb://localhost:27017/graduation")
  .then(() => {
    console.log("数据库连接成功!");
  })
  .catch(() => {
    console.log("数据库连接失败!");
  });

// 向外共享数据库连接对象
module.exports = mongoose;
