package com.example.demospringreactjs.payload.response;

public class GetDataResponse {
  private User user;

  public GetDataResponse(Long id, String username) {
    this.user = new User(id, username);
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  private class User {
    private Long _id;

    private String username;
  
    public User(Long id, String username) {
      this._id = id;
      this.username = username;
    }
  
    public Long get_id() {
      return _id;
    }
  
    public void set_id(Long id) {
      this._id = id;
    }
  
    public String getUsername() {
      return username;
    }
  
    public void setUsername(String username) {
      this.username = username;
    }
  }
}
