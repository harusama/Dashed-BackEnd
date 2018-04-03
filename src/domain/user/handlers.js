const { SHA256 } = require('crypto-js');
const nodemailer = require("nodemailer");
const boom = require('boom');

function getUser({ models, params }) {
   const { User } = models;
   const { user } = params;
   
   return User.getOne({ attributes: user.value }).then(user => {
      if (user.active) {
         return {
            ...user,
            id: undefined,
            password: undefined,
            active: undefined
         };
      }

      return Promise.reject(boom.badRequest('Email account not verified'));
   });
}

function createUser({ models, params }) {
   const { User, Hash } = models;
   const { newUser } = params;
   const hash = createHash();
   newUser.value.active = undefined;

   return User.createOne({ attributes: newUser.value }).then(user => {
      const newHash = {
         hash,
         userId: user.id
      };

      return Hash.createOne({ attributes: newHash }).then(hash => {
         return sendMail(user.email, hash.hash).then(() => '');
      }).catch(() => '');
   });
}

function validateUser({ models, params }) {
   const { User, Hash } = models;
   const { id } = params;
   const attributes = { hash: id.value };

   return Hash.getOne({ attributes }).then(hash => {
      const patchInfo = {
         id: hash.user.id,
         attributes: {
            active: true
         }
      };

      return User.patchOne(patchInfo).then(() => {
         return Hash.deleteOneById({ id: hash.id }).then(() => 'Verified');
      });
   });
}

function createHash() {
   const currentDate = new Date().toString();
   const random = Math.random().toString();
   return SHA256(currentDate + random).toString();
}

function sendMail(email, hash) {
   const transporter = nodemailer.createTransport(`smtps://${process.env.EMAIL_ACCOUNT}:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`);
   const link = `${process.env.API_URL}/users/signup/verify?id=${hash}`;
   const mailOptions = {
      to: email,
      subject: "Please confirm your email account",
      html: `
         <div style='height: 15vh; min-width: 100%; background-color: #00aeff; display:flex; align-items: center; justify-content: center;'>
            <h1 style='color: #fff; font-size: 4rem;'>Dash-ed</h1>
         </div>
         <div style='height: 30vh; min-width: 100%; background-color: #eee; display:flex; align-items: center; justify-content: center;'>
            <div style='text-align: center;'>
            <p style='font-size: 2rem; color: #555; margin-top: 0; margin-bottom: 2rem;'>
               Please confirm your email address
            </p>
            <a href=${link} style='appearance: button; border-radius: 1rem; text-decoration: none; padding: 1rem; font-size: 1.5rem; background-color: #00aeff; color: #fff; text-align: center; margin:0 auto;'>Confirm email</a>
            </div>
            
         </div>
      `
   };

   return transporter.sendMail(mailOptions);
}

module.exports = {
   getUser,
   createUser,
   validateUser
};