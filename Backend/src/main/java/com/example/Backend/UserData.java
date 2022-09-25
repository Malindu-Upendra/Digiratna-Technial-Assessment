package com.example.Backend;
import java.util.ArrayList;

public class UserData {

    private ArrayList<User> users = new ArrayList<User>();

    public UserData(){
        this.users.add(new User (1,"aaaaa","aaaaa@gmail.com"));
        this.users.add(new User (2,"bbbbb","bbbbb@gmail.com"));
        this.users.add(new User (3,"ccccc","ccccc@gmail.com"));
        this.users.add(new User (4,"ddddd","ddddd@gmail.com"));
        this.users.add(new User (5,"eeeee","eeeee@gmail.com"));
    }

    public ArrayList<User> getUsers(){
        return this.users;
    }
    
}
