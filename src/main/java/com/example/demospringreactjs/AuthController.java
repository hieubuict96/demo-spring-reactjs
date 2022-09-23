package com.example.demospringreactjs;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demospringreactjs.repository.RoleRepository;
import com.example.demospringreactjs.repository.UserRepository;
import com.example.demospringreactjs.security.jwt.TokenProvider;
import com.example.demospringreactjs.security.services.UserDetailsImplement;
import com.example.demospringreactjs.exception.BadRequestException;
import com.example.demospringreactjs.models.ERole;
import com.example.demospringreactjs.models.Role;
import com.example.demospringreactjs.models.User;
import com.example.demospringreactjs.payload.request.SigninDto;
import com.example.demospringreactjs.payload.request.SignupDto;
import com.example.demospringreactjs.payload.response.GetDataResponse;
import com.example.demospringreactjs.payload.response.SigninResponse;
import com.example.demospringreactjs.payload.response.SuccessResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TokenProvider tokenProvider;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private RoleRepository roleRepository;

  @PostMapping("/signup")
  public ResponseEntity<SuccessResponse> signup(@RequestBody @Valid SignupDto signupDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getFieldError().getField());
    }

    String username = signupDto.getUsername();
    String password = signupDto.getPassword();

    Optional<User> user = userRepository.findOneByUsername(username);

    if (user.isPresent()) {
      throw new BadRequestException("usernameAlreadyUse");
    }

    if (userRepository.findAll().size() == 0) {
      Set<Role> roles = new HashSet<>(roleRepository.findAll());

      User newUser = new User(username, passwordEncoder.encode(password), roles);
      userRepository.save(newUser);

      return new ResponseEntity<>(new SuccessResponse(), HttpStatus.CREATED);
    }

    Role role = roleRepository.findOneByName(ERole.USER.toString()).get();

    Set<Role> roles = new HashSet<>();
    roles.add(role);

    User newUser = new User(username, passwordEncoder.encode(password), roles);
    userRepository.save(newUser);

    return new ResponseEntity<>(new SuccessResponse(), HttpStatus.CREATED);
  }

  @PostMapping("/signin")
  public ResponseEntity<SigninResponse> signin(@RequestBody @Valid SigninDto signinDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getFieldError().getField());
    }

    String username = signinDto.getUser();
    String password = signinDto.getPassword();

    Authentication authentication;

    try {
      authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (BadCredentialsException e) {
      throw new BadRequestException("signinFail");
    }

    UserDetailsImplement userDetail = (UserDetailsImplement) authentication.getPrincipal();

    String token = tokenProvider.generateJwtToken(userDetail.getUsername());

    return new ResponseEntity<>(new SigninResponse(userDetail, token), HttpStatus.OK);
  }

  @GetMapping("/get-data")
  public ResponseEntity<GetDataResponse> getData() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    UserDetailsImplement user = (UserDetailsImplement) authentication.getPrincipal();

    return new ResponseEntity<>(new GetDataResponse(user.getId(), user.getUsername()), HttpStatus.OK);
  }
}
