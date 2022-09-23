package com.example.demospringreactjs.repository;

import java.util.Optional;

import com.example.demospringreactjs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findOneByUsername(String username);
}
