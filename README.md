# csbc1030 Assignment 6

Project Structure:

1. src/files/users.json contains sample JSON of users taken from https://jsonplaceholder.typicode.com/todos

2. src/routes/routes.js contains the routes for the application and imports data from users.json file. In our use case, there are two routes, one for fetching all the users and other for fetching user by ID

3. server.js imports routes and initiates an express server and mounts '/users' to all the routes coming from routes.js

4. Postman collection to run all three requests - 

POST /login to generate JWT token.

GET all users from file
GET user by Id from file - uses authentication middleware
POST a user to the file  - uses authentication and authorization(only user with userId 1 permitted) middleware


To Run:

1. clone the project into a folder.
2. npm install since node_modules are not commited.
3. node server.js
