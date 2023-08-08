const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'goitvolodymyr@meta.ua',
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = async (data) => {
  const email = { ...data, from: 'goitvolodymyr@meta.ua' };
  await transporter.sendMail(email);
  return true;
};
module.exports = sendMail;
