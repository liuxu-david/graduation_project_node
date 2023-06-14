const teacher = require("../schema/teacher.js");
const student = require("../schema/student.js");
const mongoose = require("mongoose");
// 获取所有软件学院教师信息
module.exports.getTeacherInfo = async (req, res) => {
  let result = await teacher.find();
  res.send({
    code: 200,
    info: "获取成功!",
    result,
  });
};

// 导入教师信息
module.exports.teacherHandle = (req, res) => {
  const { teacherInfo } = req.body;
  teacherInfo.forEach(async (item) => {
    await teacher.findOneAndUpdate(
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

// 这里获取所有已经通过报名的接口
module.exports.getManagePassApply = async (req, res) => {
  const { id } = req.body;
  // 这里获取传进来老师的id然后获取她管理的学生列表
  let managerStudent = await teacher.findOne({
    _id: id,
  });
  // console.log(managerStudent);
  let result = await student.find({ _id: { $in: managerStudent.student } });
  // console.log(result);

  res.send({
    code: 200,
    info: "获取成功!",
    result,
  });
};

// 获取所有申请双选的学生
module.exports.managerStudentChoose = async (req, res) => {
  const { teacherId } = req.body;
  let teacherInfo = await teacher.findOne({ _id: teacherId });
  let result = await student.find({ _id: { $in: teacherInfo.applytable } });
  let selectStudent = await student.find({
    _id: { $in: teacherInfo.selection },
  });
  let studentname = selectStudent.map((item) => item.name);
  res.send({
    code: 200,
    info: "获取成功!",
    result,
    studentname,
  });
};

// 处理学生申请
// 通过id修改学生双选的状态
module.exports.updateStudentSelectState = async (req, res) => {
  let { teacherId, studentId, value } = req.body;
  if (value === 2) {
    // 加一层判断如果超过了可指导数不能在选择了
    let teacherInfo = await teacher.findOne({ _id: teacherId });
    let guideNumber = teacherInfo.guide;
    let selectSatudent = teacherInfo.selection.length;
    if (selectSatudent < guideNumber) {
      // 通过
      await student.findByIdAndUpdate(
        { _id: studentId },
        { choosestate: value, state: "双选中" }
      );
      await teacher.findOneAndUpdate(
        { _id: teacherId },
        { $addToSet: { selection: studentId } }
      );
      res.send({
        code: 200,
        info: "处理成功!",
      });
    } else {
      res.send({
        code: 200,
        info: "你指导的学生已经超过最大可指导人数，可联系管理员增加可指导人数!",
      });
    }
  } else {
    // 不通过
    await student.findByIdAndUpdate({ _id: studentId }, { choosestate: value });
    await teacher.findOneAndUpdate(
      { _id: teacherId },
      { $pull: { applytable: studentId, selection: studentId } }
    );
    res.send({
      code: 200,
      info: "处理成功!",
    });
  }
};
module.exports.getTeacherInfoById = async (req, res) => {
  let result = await teacher.findOne({
    _id: req.body.id,
  });
  res.send({
    code: 200,
    info: "查询成功!",
    result,
  });
};
module.exports.deleteTeacherInfoById = async (req, res) => {
  await teacher.findByIdAndDelete({
    _id: req.body.id,
  });
  res.send({
    code: 200,
    info: "删除成功!",
  });
};

// 通过id更新信息
module.exports.updateTeacherInfoById = async (req, res) => {
  await teacher.findByIdAndUpdate(req.body.id, req.body.updateData);
  res.send({
    code: 200,
    info: "更新成功!",
  });
};
