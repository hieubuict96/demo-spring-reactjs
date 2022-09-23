package com.example.demospringreactjs.security.services;

import java.util.Set;
import java.util.stream.Collectors;

import com.example.demospringreactjs.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImplement implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String password;

  private Set<GrantedAuthority> authorities;

  public UserDetailsImplement(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.password = user.getPassword();
    Set<GrantedAuthority> authorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

    this.authorities = authorities;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public Set<GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(Set<GrantedAuthority> authorities) {
    this.authorities = authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
