package com.example.demospringreactjs.security.services;

import com.example.demospringreactjs.exception.UnauthorizedException;
import com.example.demospringreactjs.models.User;
import com.example.demospringreactjs.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImplement implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
     User user = userRepository.findOneByUsername(username).orElseThrow(() -> new UsernameNotFoundException("username not found"));

    return new UserDetailsImplement(user);
  }
}
