const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// 配置跨域,以下两步很重要，可以解决跨域问题
const cors = require("cors");
// 将cors配置成全局中间件
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { loginHandle, changePassword } = require("./router_handle/login_handle");
const {
  messageHandle,
  createMessage,
  deleteMessage,
} = require("./router_handle/message_handle");
const {
  studentHandle,
  getStudentInfo,
  getStudentInfoByName,
  deleteStudentInfoById,
  getStudentInfoById,
  updateStudentInfoById,
  getAllApplyStudent,
  getStudentInfoByAccount,
  updateStudentState,
  updateStudentExam,
  updateStudentChooseState,
  updateConcleStudentApply,
  getChooseResult,
  getAdminComplaintState,
} = require("./router_handle/student_handle");

const {
  addComplaint,
  complaintHandle,
  updateComplaintStateSuccess,
  updateComplaintStateRefuse,
} = require("./router_handle/complaint_handle");

const {
  getTeacherInfo,
  teacherHandle,
  getManagePassApply,
  managerStudentChoose,
  updateStudentSelectState,
  getTeacherInfoById,
  deleteTeacherInfoById,
  updateTeacherInfoById,
} = require("./router_handle/teacher_handle");

// 接口
app.post("/login", loginHandle);
app.post("/changepassword", changePassword);
app.post("/messages", messageHandle);
app.post("/createmessage", createMessage);
app.post("/detelemessage", deleteMessage);
app.post("/insertstudent", studentHandle);
app.post("/getallstudent", getStudentInfo);
app.post("/getonestudent", getStudentInfoByName);
app.post("/deletestudent", deleteStudentInfoById);
app.post("/deleteteacher", deleteTeacherInfoById);
app.post("/getstudentid", getStudentInfoById);
app.post("/getteacherid", getTeacherInfoById);
app.post("/updatestudent", updateStudentInfoById);
app.post("/updateteacher", updateTeacherInfoById);
app.post("/getstudentaccount", getStudentInfoByAccount);
app.post("/getallapply", getAllApplyStudent);
app.post("/updatestate", updateStudentState);
app.post("/complaints", complaintHandle);
app.post("/addcomplaint", addComplaint);
app.post("/updatecomplaint1", updateComplaintStateSuccess);
app.post("/updatecomplaint2", updateComplaintStateRefuse);
app.post("/updateexam", updateStudentExam);
app.post("/getallteacher", getTeacherInfo);
app.post("/insertteacher", teacherHandle);
app.post("/getmanagerpass", getManagePassApply);
app.post("/updatechoosestate", updateStudentChooseState);
app.post("/managerstudent", managerStudentChoose);
app.post("/updateselectstate", updateStudentSelectState);
app.post("/concelapply", updateConcleStudentApply);
app.post("/getteachername", getChooseResult);
app.post("/getadminstate", getAdminComplaintState);

// 创建服务器
app.listen(3000, () => {
  console.log("服务器已经启动!");
});
