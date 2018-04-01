const { SHA256 } = require('crypto-js');
const nodemailer = require("nodemailer");

function createUser({ models, params }) {
    const { User, Hash } = models;
    const { newUser } = params;
    console.log('newUser', newUser.value);

    const currentDate = new Date().toString();
    const random = Math.random().toString();
    const hash = SHA256(currentDate + random).toString();

    return User.createOne({ attributes: newUser.value}).then(user => {
        const newHash = {
            hash,
            userId: user.id
        };

        return Hash.createOne({ attributes: newHash }).then(hash => {
            const transporter = nodemailer.createTransport('smtps://test.dashed@gmail.com:testdashed@smtp.gmail.com');
            const link = `https://dash-ed.herokuapp.com/v1/verify?id=${hash.hash}`;
            const mailOptions = {
                to: user.email,
                subject: "Please confirm your Email account",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            };

            return transporter.sendMail(mailOptions);
        });
    });
};

module.exports = {
    createUser
};