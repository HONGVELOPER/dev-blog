const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS,
    }
})

const MailHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            console.log(req.body, 'body check')
            const mailOptions = {
                from: process.env.MAIL_SENDER,
                to: process.env.MAIL_RECIEVER,
                subject: req.body.title,
                text: req.body.text,
            }
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send()
                } else {
                    return res.status(200).send()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default MailHandler