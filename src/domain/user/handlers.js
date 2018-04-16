const { SHA256 } = require('crypto-js');
const nodemailer = require("nodemailer");
const boom = require('boom');

async function getUser({ models, params, res }) {
   const { User, UserSubject } = models;
   const { user } = params;
   user.value.password = SHA256(user.value.password).toString();
   
   const userFound = await User.getOne({ attributes: user.value });
   
   if (userFound.active) {
      const token = userFound.generateAuthToken()
   
      const patchInfo = {
         id: userFound.id,
         attributes: { token }
      };

      await User.patchOne(patchInfo);

      const attributes = { userId: userFound.id };
      const userSubjects = await UserSubject.getManyWith({ attributes});
      const subjects = userSubjects.map(userSubject => {
         return {
            id: userSubject.subject.id,
            name: userSubject.subject.name
         };
      });

      res.header('x-auth', token);

      return {
         ...userFound,
         id: undefined,
         password: undefined,
         active: undefined,
         token: undefined,
         subjects: subjects
      };
   }

   return Promise.reject(boom.badRequest('Email account not verified'));
}

async function getCurrentUser({ models, params, user }) {
   return {
      ...user,
      id: undefined,
      password: undefined,
      active: undefined,
      token: undefined
   };
}

async function createUser({ models, params }) {
   const { User, Hash } = models;
   const { newUser } = params;
   newUser.value.password = SHA256(newUser.value.password).toString();
   newUser.value.active = undefined;
   
   const user = await User.createOne({ attributes: newUser.value });

   const newHash = {
      hash: Hash.createHash(),
      userId: user.id
   };

   try {
      const hash = await Hash.createOne({ attributes: newHash });
   
      if (process.env.NODE_ENV !== 'test') {
         await sendMail(user.email, hash.hash);
      }
   
      return '';
   } catch (e) {
      return '';
   }
}

async function verifyUser({ models, params }) {
   const { User, Hash } = models;
   const { id } = params;
   const attributes = { hash: id.value };
   const hash = await Hash.getOne({ attributes });

   const patchInfo = {
      id: hash.user.id,
      attributes: { active: true }
   };

   await User.patchOne(patchInfo);
   await Hash.deleteOneById({ id: hash.id });
   return 'Verified';
}

function sendMail(email, hash) {
   const transporter = nodemailer.createTransport(`smtps://${process.env.EMAIL_ACCOUNT}:${process.env.EMAIL_PASSWORD}@smtp.gmail.com`);
   const link = `${process.env.EMAIL_VERIFY_URL}?id=${hash}`;
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
   verifyUser,
   getCurrentUser
};