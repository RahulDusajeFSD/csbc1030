# csbc1030 Assignment 4

Project Structure:


1) files/users.json contains sample JSON of users taken from https://jsonplaceholder.typicode.com/todos

2) routes/routes.js contains the routes for the application and imports data from users.json file. In our use case, there are two routes, one for fetching all the users and other for fetching user by ID

3) server.js imports routes and initiates an express server and mounts '/users' to all the routes coming from routes.js

4) Postman collection to run both requests.


To Run:

1) clone the project into a folder.
2) npm install since node_modules are not commited.
2) node server.js