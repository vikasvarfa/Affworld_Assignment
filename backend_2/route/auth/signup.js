const bcrypt = require('bcryptjs')
const User = require('../../model/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)
        if (!(email && password, name)) {
            return res.status(400).send({ status: "FAILURE", message: "All fields are required" })
        }

        const oldUser = await User.findOne({ email: email })
        console.log(oldUser)
        if (oldUser) return res.status(409).send({status : "FAILURE", message : "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create(
            {
                email: email.toLowerCase(),
                password: hashedPassword,
                name
            }
        )

        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_STRING, { expiresIn: "1d" });

        user.token = token

        return res.status(201).json({status : "SUCCESS", user : user});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status : "FAILURE", message : "Internal Server Error"});

    }
}
