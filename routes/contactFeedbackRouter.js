const express = require('express')
const feedbackRouter = express.Router()
const nodemailer = require('nodemailer')

const transport = {
  //all of the configuration for making a site send an email.
  
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.THE_FEEDBACK,
    pass: process.env.THE_FEEDBACK_PASS
  }
};

// makes the connection with gmail through the object above.
const transporter = nodemailer.createTransport(transport);
  transporter.verify((error, success) => {
    if(error) {
      //if error happened code ends here
      console.error(error)
    } else {
      //this means success
      console.log('users ready to send feedback,')
    }
  });
    //where we get the information from the front end to the back end. 
    // post route is declared from the server.js
  feedbackRouter.post('/', (req,res, next) => {
    //make mailable object
    const mail = {
      from: process.env.THE_FEEDBACK,
      to: 'tallan.taven@gmail.com',
      subject: req.body.subject,
      text: `
      from:
      ${req.body.name} 
      
      contact: ${req.body.email}

      message: 

      ${req.body.text}`
    }
    //catch error or alert success. 
    transporter.sendMail(mail, (err,data) => {
      if(err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
          status: 'success'
        })
      }
    })
    //end of post 
  });

module.exports = feedbackRouter