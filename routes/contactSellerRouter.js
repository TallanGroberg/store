const express = require("express");
const contactRouter = express.Router();
const nodemailer = require('nodemailer');


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
    console.log('seller is ready to take messages,');
  };
});

contactRouter.post("/", (req,res,next) => {
  console.log(req.body);
  const mail = {
    from: `${req.body.artHub}`,
    to: req.body.email,
    subject: `${req.body.subject}`,
    text: `
      ${req.body.message}
      
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