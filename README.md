# Digiratna-Technial-Assessment

clone the project

Frontend = ReactJS

run "npm i" in the terminal to download the packges
react-bootstrap used for components
run "npm start" to start the frontend

Backend = SpringBoot

run "mvn spring-boot:run" to start the backend

I have changed the backend port to 5000. if you want to check individual apis use below urls

get = http://localhost:5000/getAllUsers
get = http://localhost:5000/getUser/1
post = http://localhost:8080/addNewUser

{
    "userName":"sample",
    "email":"sample@gmail.com"
}

delete = http://localhost:5000/deleteUser/2
put = http://localhost:8080/updateUser/2

{
    "userId":2,
    "userName":"asd",
    "email":"asd@gmail.com"
}
