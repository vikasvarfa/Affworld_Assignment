const Secret = require("../../model/secret");
module.exports = async (req, res) => {
  try {
    const { text } = req.body;
    const user_id = req.user.user_id;
    const isAlreadyPosted = await Secret.findOne({ user_id: user_id });
    if (isAlreadyPosted) {
      return res.status(400).send({
        status: "FAILURE",
        message: "You have already posted a secret",
      });
    }
    const postedSecret = await Secret.create({ user_id: user_id, text: text });
    if (postedSecret) {
      return res.status(200).send({ status: "SUCCESS", message: "Secret added successfully!" });
    }
    return res.status(500).send({ status: "FAILURE", message: "Internal server error" });
  } catch (e) {
    return res.status(500).send({ status: "FAILURE" , message : "Internal server error"});
  }
};
