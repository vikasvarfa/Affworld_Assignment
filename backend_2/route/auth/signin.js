const bcrypt = require('bcryptjs')
const User = require('../../model/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            const verification = await bcrypt.compare(password, user.password);
            if (verification) {
                const token = jwt.sign(
                    {
                        user_id: user._id,
                        email
                    },
                    process.env.TOKEN_STRING,
                    {
                        expiresIn: "1d"
                    }
                )
                user.token = token
                return res.status(200).json({ status: "SUCCESS", user: user })
            }
            return res.status(400).send({status : "FAILURE", message : "Invalid password"});
        }
        return res.status(400).send({status : "FAILURE", message : "Invalid email or User does not exist"});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status :"FAILURE", message: "Internal Server Error"});
    }
}