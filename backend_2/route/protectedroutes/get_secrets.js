const Secret = require("../../model/secret");
module.exports = async (req, res) => {
  try {
    const secrets = await Secret.find();
    const response_secrets = secrets.map((secret) => ({
      time_stamp: secret.created_at,
      text: secret.text,
    }));
    return res
      .status(200)
      .send({ status: "SUCCESS", secrets: response_secrets });
  } catch (e) {
    return res.status(500).send({ status: "FAILURE", message: "Internal server error" });
  }
};
