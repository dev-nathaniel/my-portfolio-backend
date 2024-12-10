const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Added CORS middleware
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enabled CORS for all routes

// The transporter auth does not necessarily have to be the same as the 'from' in mailOptions.
  // However, in this case, we are using Gmail as the service, and Gmail requires the 'from' field to match the authenticated user.
  // This is a security feature to prevent email spoofing.
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adebayoolowofoyeku@gmail.com',
      pass: process.env.THING
    }
  });

app.post('/sendEmail', (req, res) => {
  const { service, budget, period, name, company, email, projectBrief } = req.body;

  

  let mailOptions = {
    from: 'adebayoolowofoyeku@gmail.com',
    to: 'adebayoolowofoyeku@gmail.com',
    replyTo: email, // Added replyTo field to allow the recipient to reply directly to the sender
    subject: 'JOB ENQUIRY',
    headers: {
      'Importance': 'high',
      'X-Priority': '1'
    },
    html: `
      <div style="background-color: #f0f0f0; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333; font-weight: bold; margin-top: 0;">JOB ENQUIRY</h1>
        <p style="font-size: 18px; margin-bottom: 20px;">You have received a new job enquiry from ${name} at ${company}.</p>
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; font-weight: bold; margin-top: 0;">Job Details</h2>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Service:</strong> ${service}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Budget:</strong> ${budget}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Delivery Period:</strong> ${deliveryPeriod}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Project Brief:</strong> ${projectBrief}</p>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take messages")
    }
})
