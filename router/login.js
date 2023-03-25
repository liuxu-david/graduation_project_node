const express = require("express");
const router = express.Router();

// 导入登录的一系列操作
const {
  loginHandle,
  profileHandle,
} = require("../router_handle/login_handle.js");
router.post("/login", loginHandle);
router.post("/profile", profileHandle);

module.exports = router;
