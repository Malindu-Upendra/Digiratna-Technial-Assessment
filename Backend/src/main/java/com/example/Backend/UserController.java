package com.example.Backend;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController {

    private ArrayList<User> users = new ArrayList<User>();
    private UserData userdata = new UserData();

    public UserController() {
        this.users = this.userdata.getUsers();
    }

    @GetMapping("/testApi")
    public String testAPI() {
        return "Testing Api";
    }

    // to retrieve all the users
    @GetMapping("/getAllUsers")
    public ArrayList<User> getAllUsers() {
        return this.users;
    }

    // retrieving a user using his/her id
    @GetMapping("/getUser/{id}")
    public User getAllUsers(@PathVariable Long id) {

        for (User user : this.users) {
            if (user.getUserId() == id) {
                return user;
            }
        }
        return null;
    }

    // saving a new user to the array
    @PostMapping("/addNewUser")
    public User addUser(@RequestBody User newUser) {
        newUser.setUserId(this.users.size() + 1);
        Boolean result = this.users.add(newUser);
        if(result){
            return newUser;
        }

        return null;
    }

    // removing a user using his/her id
    @DeleteMapping("/deleteUser/{id}")
    public Boolean deleteUser(@PathVariable Long id) {
        for (User user : this.users) {
            if (user.getUserId() == id) {
                this.users.remove(user);
                return true;
            }
        }

        return false;
    }

    // updateing user's email and the username
    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        for (User user : this.users) {
            if (user.getUserId() == id) {
                user.setEmail(updatedUser.getEmail());
                user.setUserName(updatedUser.getUserName());
                return user;
            }
        }

        return null;
    }
}
