const complaint = require("../schema/complaint");

module.exports.complaintHandle = async (req, res) => {
  let result = await complaint.find();
  res.send({
    code: 200,
    info: "success!",
    result,
  });
};

module.exports.addComplaint = async (req, res) => {
  const { account, name, id, content } = req.body;
  await complaint.insertMany({ account, name, id, content, state: "申诉中" });
  res.send({
    code: 200,
    info: "申诉已提交！",
  });
};

// 通过id修改学生申诉状态;
module.exports.updateComplaintStateSuccess = async (req, res) => {
  let { id } = req.body;
  await complaint.findByIdAndUpdate(id, { complaintstate: "已处理" });
  res.send({
    code: 200,
    info: "处理申诉成功!",
  });
};
module.exports.updateComplaintStateRefuse = async (req, res) => {
  let { id } = req.body;
  await complaint.findByIdAndUpdate(id, { complaintstate: "已拒绝" });
  res.send({
    code: 200,
    info: "拒绝申诉成功!",
  });
};
