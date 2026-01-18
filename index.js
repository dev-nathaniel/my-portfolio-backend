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

app.post('/valentine', (req, res) => {

  let mailOptions = {
    from: 'adebayoolowofoyeku@gmail.com',
    to: 'adebayoolowofoyeku@gmail.com',
    replyTo: 'adebayoolowofoyeku@gmail.com',
    subject: 'VALENTINES',
    headers: {
      'Importance': 'high',
      'X-Priority': '1'
    },
    html: `
    <!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
    }


body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe6ec, #fff);
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.email-wrapper {
  width: 100%;
  max-width: 480px;
  padding: 20px;
}

.email-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.heart {
  font-size: 40px;
  margin-bottom: 12px;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #e6396f;
  margin-bottom: 20px;
}

.message {
  font-size: 16px;
  color: #333333;
  line-height: 1.6;
  margin-bottom: 14px;
}

.hurray {
  font-size: 18px;
  font-weight: bold;
  color: #e6396f;
  margin: 18px 0;
}

.celebrate {
  font-size: 16px;
  font-weight: 500;
  color: #555555;
  margin-top: 10px;
}

  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="heart">💖</div>

  <div class="title">
    Valentine Accepted
  </div>

  <div class="message">
    Kiara has accepted to be your Valentine.
  </div>

  <div class="hurray">
    Hurray! 🎉
  </div>

  <div class="celebrate">
    Celebrate your love together on the 14th of February ❤️
  </div>
</div>

  </div>
</body>
</html>
`
}

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send('Error sending email')
      } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
})

app.post('/sendEmail', (req, res) => {
  const { service, budget, period, name, company, email, details } = req.body;

  

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
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Delivery Period:</strong> ${period}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Project Brief:</strong> ${details}</p>
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
