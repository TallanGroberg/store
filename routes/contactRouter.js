const express = require("express");
const contactRouter = express.Router();
const nodemailer = require('nodemailer');
console.log('test',)

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.THE_USER,
    pass: process.env.THE_PASS
  }
};
const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Server is ready to take messages');
  };
});
contactRouter.post("/", (req,res,next) => {
  console.log(req.body);
  const mail = {
    from: `${req.body}`,
    to: `tallan.taven@gmail.com`,
    subject: `NEW MESSAGE it worked Contact Form. Subject: ${req.body.email}`,
    text: `
      From: ${req.body} ${req.body}
      
      `
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      });
    } else {
      res.json({
        status: 'success'
      });
    };
  });
});

module.exports = contactRouter;