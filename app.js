const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// 配置跨域,以下两步很重要，可以解决跨域问题
const cors = require("cors");
// 将cors配置成全局中间件
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 导入登录
const loginRouter = require("./router/login.js");

app.use("/api", loginRouter);

// 创建服务器
app.listen(3000, () => {
  console.log("服务器已经启动!");
});
