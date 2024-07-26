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
<li>validator - <i>third-party library to validate email, string and pattern</i></li>
</ul>


## Setup

- fork this project into your own Github repo
- create a .env file below index.js file
- vercel.json file is added for deployment in Vercel. If your want to deploy to other then delete it.
- go to utils/corsOptions.js ⇒ replace my frontend url with yours or type "http://localhost:5173" for local 

<h4>.env Variables</h4>
  
- NODE_ENV=(type "production" on deployed website, for local pc type "development")
- CLIENT_URL=(deployed client url or http://localhost:5173) [More Info](https://github.com/Kamit6337/voosh-project-client)  
- JWT_SECRET_KEY=(secret key , genearate by type this code in terminal)
  ```openssl rand -base64 32```   
- EXPIRES_IN=(expire time of user session in milliseconds like 84600000 for one day. Default is One Day)
- MONGO_DB_URI=(mongoDB Atlas URI from [MongoDB Official Website](https://account.mongodb.com/account/login))
- GOOGLE_OAUTH_CLIENT_ID=(if you want to integrate GoogleOauth Login. Get clinet ID and secret. From [Google Developer Console](https://console.cloud.google.com/))
- GOOGLE_OAUTH_CLIENT_SECRET=
- MY_GMAIL_ID=(your gmail Id to send user otp from your email. Ex:- example@gmail.com)
- MY_GMAIL_PASSWORD=(not original password, but generate password for Websites. Ex:- dfgf dfdf gssg fdas)      
  Go to your Gmail ⇒ Manage Your Google Account ⇒ type App Password in Search bar => generate Password
- ENCRYPTION_KEY=(after forking, open it in VS Code, then type "npm run crypto. You will get ENCRYPTION_KEY and ENCRYPTION_IV. Copy and paste into your .env file)
- ENCRYPTION_IV=


ALL ENVIRONMENT VARIABLE IS IMPORTANT FOR BETTER FUNCTIONING AND GET ALL BENEFITS AND FEATURES.

## Screenshots
Here are the screenshots of this project.

![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh1.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh2.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh3.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh4.png)

