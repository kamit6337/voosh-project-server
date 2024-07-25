# Voosh Project

This is a assignment project from Voosh Food Technology   
You can visit the [Live website](https://voosh-project-client.vercel.app/)  

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech](#tech)
- [Setup](#setup)
- [Screenshots](#screenshots)

## Description

This is a Todos making website where you can create, update and delete Todos. As there are three categories based on status of todo, Pending, In Progress and Done. So, you can keep track of your todos.

## Features
- used passport.js for Google OAuth Login or custom Email and Password login
- 8 digit otp send to user email for sign up verification
- user password hashed using bcrypt before saving into database
- apply express.js middleware to protect routes and data
- making all CRUD operations to MongoDB database using Mongoose
- global error handling in one place - globalErrorHandler.js
- third-party middlewares to protect attacks like helmet, xss-clean and express-mongo-sanitize
- ensure proper validation in mongoose schema using validator library

## Tech

<ul>
<li>Node JS</li>
<li>Express JS</li>
<li>MongoDB - <i>NoSQL databse to store user data</i></li>
<li>Passprt JS - <i>for Google OAuth login</i></li>
<li>bcryptjs - <i>for hashing user password</i></li>
<li>nodemailer - <i>send link to email to create new password in case of forgot password</i></li>
<li>nodemailer - <i>send link to email to create new password in case of forgot password</i></li>
<li>express-mongo-sanitize - <i>prevent attack from NoSQL injection</i></li>
<li>xss-clean - <i>prevent attack from XSS attack</i></li>
<li>va - <i>prevent attack from XSS attack</i></li>

</ul>


## Setup

- fork this project into your own Github repo
- create a .env file below index.html file
- vercel.json file is added for deployment in Vercel. If your want to deploy to other then delete it.

<h4>.env Variables</h4>


- VITE_APP_SERVER_URL=(this-project-server url) For More info : [Server](https://github.com/Kamit6337/voosh-project-server)
- VITE_APP_NODE_ENV=(type "production" on deployed website, for local pc type "development")
- VITE_APP_GT4_MEASUREMENT_ID=(in case you want to add Google Analytics. Get your Measurement ID from [Google Analytics](https://google.com/analytics) after deploy your frontend website because you will need deployed url.






## Screenshots
Here are the screenshots of this project.

![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh1.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh2.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh3.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh4.png)

