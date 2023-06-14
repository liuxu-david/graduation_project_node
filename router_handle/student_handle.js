const student = require("../schema/student.js");
const teacher = require("../schema/teacher.js");
const complaint = require("../schema/complaint");

// 导入上学期所有学生信息和成绩接口
module.exports.studentHandle = (req, res) => {
  const { sudentInfo } = req.body;
  sudentInfo.forEach(async (item) => {
    await student.findOneAndUpdate(
      {
        account: item.account,
      },
      { $set: item },
      { upsert: true }
    );
  });
  res.send({
    code: 200,
    info: "导入成功!",
  });
};

// 获取所有软件学院的学生
module.exports.getStudentInfo = async (req, res) => {
  let result = await student.find();
  res.send({
    code: 200,
    info: "获取成功!",
    result,
  });
};

// 通过姓名查询信息
module.exports.getStudentInfoByName = async (req, res) => {
  let query = {};
  if (req.body.name) query.name = req.body.name;
  if (req.body.account) query.account = req.body.account;
  let result = await student.find(query);
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};
// 通过id查询信息
module.exports.getStudentInfoById = async (req, res) => {
  let result = await student.findOne({
    _id: req.body.id,
  });
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};
// 通过学号查询信息
module.exports.getStudentInfoByAccount = async (req, res) => {
  let result = await student.findOne({
    account: req.body.account,
  });
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};
// 通过学号删除信息
module.exports.deleteStudentInfoById = async (req, res) => {
  await student.findByIdAndDelete({
    _id: req.body.id,
  });
  res.send({
    code: 200,
    info: "删除成功!",
  });
};
// 通过id更新信息
module.exports.updateStudentInfoById = async (req, res) => {
  await student.findByIdAndUpdate(req.body.id, req.body.updateData);
  res.send({
    code: 200,
    info: "更新成功!",
  });
};

// 获取所有报名成功的人
module.exports.getAllApplyStudent = async (req, res) => {
  let result = await student.find({
    state: { $ne: "未报名" },
  });
  // let allStudentId = result.map((item) => item._id);
  result.forEach(async (item) => {
    await student.findOneAndUpdate(
      { _id: item._id },
      {
        allexam: (
          (item.firstexam + item.secondexam + item.thirdexam + item.addexam) *
          0.4
        ).toFixed(0),
      }
    );
  });
  // findOneAndUpdate();

  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};

// 通过id修改学生报名状态;
module.exports.updateStudentState = async (req, res) => {
  let { id, radio } = req.body;
  let value = radio == "1" ? "审核中" : "已通过";
  await student.findByIdAndUpdate(id, { state: value });
  res.send({
    code: 200,
    info: "报名成功!",
  });
};
// 根据id修改学生的成绩
module.exports.updateStudentExam = async (req, res) => {
  let { id, updateExam } = req.body;
  await student.findByIdAndUpdate(id, updateExam);
  let studentInfo = await student.findOne({ _id: id });
  if (studentInfo.secondexam !== 0) {
    await student.findByIdAndUpdate(id, { state: "机试" });
  }
  if (studentInfo.thirdexam !== 0) {
    await student.findByIdAndUpdate(id, { state: "面试" });
  }
  res.send({
    code: 200,
    info: "成绩更新成功!",
  });
};

// 通过id修改学生双选的状态
module.exports.updateStudentChooseState = async (req, res) => {
  let { studentId, teacherId, value } = req.body;
  // 改学生的师生双选的状态
  await student.findByIdAndUpdate({ _id: studentId }, { choosestate: value });
  // 把这个学生添加到老师的申请表中
  await teacher.findOneAndUpdate(
    { _id: teacherId },
    { $addToSet: { applytable: studentId } }
  );
  res.send({
    code: 200,
    info: "执行成功!",
  });
};

// 获取学生跟老师实现双选老师的姓名
module.exports.getChooseResult = async (req, res) => {
  let { studentId } = req.body;
  let result = await teacher.findOne({
    selection: { $in: [studentId] },
  });
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};

// 学生撤销选择老师
module.exports.updateConcleStudentApply = async (req, res) => {
  let { studentId } = req.body;
  await student.findByIdAndUpdate({ _id: studentId }, { choosestate: 0 });
  let allTeacher = await teacher.find();
  let teacherId = allTeacher.map((item) => item._id);
  teacherId.forEach(async (item) => {
    await teacher.findOneAndUpdate(
      { _id: item },
      { $pull: { applytable: studentId, selection: studentId } }
    );
  });

  res.send({
    code: 200,
    info: "撤销成功!",
  });
};
// 通过学号查询申诉状态
module.exports.getAdminComplaintState = async (req, res) => {
  let result = await complaint.find({
    id: req.body.id,
  });
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};
