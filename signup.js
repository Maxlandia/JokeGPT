
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for verification codes (replace with a database in a real application)
const verificationCodes = {};

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Your email address
    pass: 'your_password' // Your email password or application-specific password
  }
});

// Endpoint for signup form submission
app.post('/signup', (req, res) => {
  const { email } = req.body;

  // Generate a random verification code (6 digits)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // Store the verification code associated with the user's email
  verificationCodes[email] = verificationCode;

  // Email message options
  const mailOptions = {
    from: 'your_email@gmail.com', // Sender address
    to: email, // Recipient address (user's email)
    subject: 'Account Verification Code', // Email subject
    text: `Your verification code is: ${verificationCode}` // Email body
  };

  // Send the email with the verification code
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send('Error sending verification code');
    } else {
      console.log('Email sent:', info.response);
      res.redirect(`/verify?email=${email}`);
    }
  });
});

// Endpoint for verification page
app.get('/verify', (req, res) => {
  const { email } = req.query;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification</title>
    </head>
    <body>
      <script>
        const email = "${email}";
        const enteredCode = prompt("Please check your email for the verification code and enter it here:");
        const correctCode = ${verificationCodes[email]}; // Get the correct verification code for the user
        if (enteredCode === correctCode) {
          alert("Verification successful! Redirecting to homepage.");
          window.location.href = "index.html";
        } else {
          alert("Incorrect verification code. Please try again.");
        }
      </script>
    </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Extract form data
    const formData = new FormData(this);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Simulated user accounts (replace with actual backend logic)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username or email already exists
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      alert("Username or email already exists. Please choose a different one.");
      return;
    }

    // Add the new user to the list of users
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    // Redirect to login page or perform further actions
    // Replace "login.html" with the actual URL of your login page
    window.location.href = "index.html";
  });