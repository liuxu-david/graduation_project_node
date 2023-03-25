const { manager } = require("../schema/user.js");

const jwt = require("jsonwebtoken");

exports.loginHandle = async (req, res) => {
  const userData = req.body;
  let { account, password } = userData;
  // console.log(account);
  const result = await manager.findOne({
    account,
    password,
  });
  if (result) {
    const tokenStr = jwt.sign(userData, "liuxuzhenniubi^_^", {
      // token有效期设置
      expiresIn: "10h",
    });
    res.send({
      code: 200,
      info: "登录成功！",
      token: "Bearer" + tokenStr,
    });
  } else {
    res.send({
      code: 0,
      info: "登录失败！",
    });
  }
};

// exports.profileHandle = async (req, res) => {
//   // 根据字段判断
//   // 如果0为管理员，如果为1为教师，如果为2就是学生
//   const permission = req;
//   switch (permission) {
//     // 管理员
//     case 0:
//       res.send({
//         code: 200,
//         info: "success",
//         data: {
//           menu: [],
//         },
//       });
//       break;
//     // 教师
//     case 1:
//       res.send({
//         code: 200,
//         info: "success",
//         data: {
//           menu: [
//             {
//               path: "",
//               name: "",
//               label: "",
//             },
//           ],
//         },
//       });
//       break;
//     default:
//       // 学生
//       res.send({
//         code: 200,
//         info: "success",
//         data: {
//           menu: [],
//         },
//       });
//   }
// };
