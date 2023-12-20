# csbc1030 Assignment 5

Project Structure:


1) files/users.json contains sample JSON of users taken from https://jsonplaceholder.typicode.com/todos

2) controller/userController.js contains business logic of the application.

3) model/usersModel.js imports files from files/users.json and finds users, usersById & addUserToFile

4) routes/userRoutes.js contains routes coming in from server.js and routing them to userController.js

5) Postman collection.


To Run:

1) clone the project into a folder.
2) npm install
3) node server.js