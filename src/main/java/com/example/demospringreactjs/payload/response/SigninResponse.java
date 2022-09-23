package com.example.demospringreactjs.payload.response;

import com.example.demospringreactjs.security.services.UserDetailsImplement;

public class SigninResponse {
  private UserResponse user;

  private String accessToken;

  public SigninResponse(UserDetailsImplement user, String token) {
    this.user = new UserResponse(user.getId(), user.getUsername());
    this.accessToken = token;
  }

  public UserResponse getUser() {
    return user;
  }

  public void setUser(UserResponse user) {
    this.user = user;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  private class UserResponse {
    private Long _id;

    private String username;

    public UserResponse(Long id, String username) {
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
