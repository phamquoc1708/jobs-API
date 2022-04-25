# jobs-API
Project Setup

In order to spin up the project, in the root create .env with these two variable, with your own values.
JWT_SECRET && MONGO_DB

Set up
npm install && npm start 

Database Connection
1. Import connect.js
2. Invoke in index.js

Routers
1. index.js 
2. auth.js 
3. job.js

Register User
1. Validate - name, email, password - with MongoDB
2. Hash Password (by bcrypy)
3. Save user
4. Generate Token (by JWT)
5. Send response with Token

Login User
1. Validate - email, password - in Controller
2. If email or password is missing, throw BadRequest
3. Find User by email
4. Compare password
5. If no user or password does not match, throw UnauthenticatedError
6. If correct, generate Token
7. Send Response with Token

Job 
1. Validate - company, position
2. Expect get all job, you can get paginate and sort by parameters page and sort

Security
1. helmet
2. cors