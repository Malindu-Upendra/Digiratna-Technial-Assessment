package com.example.Backend;

public class User {
    private long userId;
    private String userName;
    private String email;

    public User(){}

    public User(long userId, String userName, String email){
        this.userId = userId;
        this.userName = userName;
        this.email = email;
    }

    public void setUserId(long userId){
        this.userId = userId;
    }

    public long getUserId(){
        return this.userId;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getUserName(){
        return this.userName;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getEmail(){
        return this.email;
    }
}
