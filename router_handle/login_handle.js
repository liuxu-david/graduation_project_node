const manager = require("../schema/manager.js");
const teacher = require("../schema/teacher.js");
const student = require("../schema/student.js");

const jwt = require("jsonwebtoken");

module.exports.loginHandle = async (req, res) => {
  let { account, password, flag } = req.body;
  flag = Number(flag);
  // 获取所有通过报名的学生
  let allStudentId = await student
    .find({ state: "已通过" })
    .select("account")
    .sort({ account: -1 });
  // 获取所有的老师及其id
  let allTeacherId = await teacher
    .find()
    .select("account")
    .sort({ account: 1 });
  // 获取到每个学生的成绩后将每个学生分配个每个老师
  allStudentId.forEach(async (item, index) => {
    let indey = index % allTeacherId.length;
    let result = await teacher.findByIdAndUpdate(
      { _id: allTeacherId[indey]._id },
      { $addToSet: { student: item._id } }
    );
  });

  switch (flag) {
    case 0:
      let result1 = await manager.findOne({
        account,
        password,
      });
      if (result1) {
        const tokenStr = jwt.sign(req.body, "liuxuzhenniubi^_^", {
          // token有效期设置
          expiresIn: "10h",
        });
        res.send({
          code: 200,
          info: "登录成功！",
          token: "Bearer" + tokenStr,
          result: result1,
        });
      } else {
        res.send({
          code: 0,
          info: "登录失败！",
        });
      }
      break;
    case 1:
      let result2 = await teacher.findOne({
        account,
        password,
      });
      if (result2) {
        const tokenStr = jwt.sign(req.body, "liuxuzhenniubi^_^", {
          // token有效期设置
          expiresIn: "10h",
        });
        res.send({
          code: 200,
          info: "登录成功！",
          token: "Bearer" + tokenStr,
          result: result2,
        });
      } else {
        res.send({
          code: 0,
          info: "登录失败！",
        });
      }
      break;
    default:
      let result3 = await student.findOne({
        account,
        password,
      });
      if (result3) {
        const tokenStr = jwt.sign(req.body, "liuxuzhenniubi^_^", {
          // token有效期设置
          expiresIn: "10h",
        });
        res.send({
          code: 200,
          info: "登录成功！",
          token: "Bearer" + tokenStr,
          result: result3,
        });
      } else {
        res.send({
          code: 0,
          info: "登录失败！",
        });
      }
  }
};

module.exports.changePassword = async (req, res) => {
  let { id, password, flag } = req.body;
  flag = Number(flag);
  switch (flag) {
    case 0:
      await manager.findOneAndUpdate(
        { _id: id },
        { $set: { password: password } }
      );
      res.send({
        code: 200,
        info: "修改成功！",
      });
      break;
    case 1:
      await teacher.findOneAndUpdate(
        { _id: id },
        { $set: { password: password } }
      );
      res.send({
        code: 200,
        info: "修改成功！",
      });
      break;
    default:
      await student.findOneAndUpdate(
        { _id: id },
        { $set: { password: password } }
      );
      res.send({
        code: 200,
        info: "修改成功！",
      });
  }
};
