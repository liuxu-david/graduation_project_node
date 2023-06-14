const message = require("../schema/message.js");

module.exports.messageHandle = async (req, res) => {
  let result = await message.find();
  res.send({
    code: 200,
    info: "success!",
    result,
  });
};

module.exports.createMessage = async (req, res) => {
  const { title, content } = req.body;
  await message.insertMany({ title, content });
  res.send({
    code: 200,
    info: "发布成功！",
  });
};

module.exports.deleteMessage = async (req, res) => {
  const { id } = req.body;
  await message.findByIdAndDelete(id);
  res.send({
    code: 200,
    info: "删除成功！",
  });
};
