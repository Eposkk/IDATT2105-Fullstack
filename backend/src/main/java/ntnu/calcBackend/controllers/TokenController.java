package ntnu.calcBackend.controllers;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import ntnu.calcBackend.logic.PasswordHashing;
import ntnu.calcBackend.model.User;
import ntnu.calcBackend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@EnableAutoConfiguration
@CrossOrigin
public class TokenController {

    public static String keyStr = "testsecrettestsecrettestsecrettestsecrettestsecret";
    @Autowired
    UserRepository userRepository;
    Logger logger = LoggerFactory.getLogger(TokenController.class);

    @CrossOrigin
    @PostMapping(value = "/token")
    @ResponseStatus(value = HttpStatus.CREATED)
    public String generateToken(@RequestParam("username") final String username, @RequestParam("password") final String password) throws Exception {

        User user = userRepository.findByUsername(username);
        if (user != null) {
            if (user.getUsername().equals(username) && PasswordHashing.validatePassword(password,user.getPassword())) {
                logger.info("/token Got user: " + username);
                return generateToken(username);
            }
            return "Wrong Password";
        }
        logger.info("User was not found");
        return "Access denied, wrong credentials....";
    }

    public String generateToken(String userId) {
        Key key = Keys.hmacShaKeyFor(keyStr.getBytes(StandardCharsets.UTF_8));
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("userId", userId);
        claims.put("authorities", grantedAuthorities
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000000))
                .signWith(key)
                .compact();
    }

    @CrossOrigin
    @PostMapping("/register")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<User> createUser(@RequestParam("username") final String username,
                                           @RequestParam("password") final String password) {
        logger.info("name: " + username + " password: " + password);
        try {
            String hashedPassword = PasswordHashing.generatePasswordHash(password);
            User user = userRepository
                    .save(new User(username, hashedPassword));
            logger.info("Added user: " +user.getUsername());
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.info("Could not add user: "+ username);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin
    @PostMapping("/user")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<User> getUser(@RequestParam("username") final String username,
                                           @RequestParam("password") final String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        User user = userRepository.findByUsername(username);
        if (user!=null){
            if (PasswordHashing.validatePassword(password, user.getPassword())){
                logger.info("/user Username: " + username +" sent");
                return new ResponseEntity<>(user, HttpStatus.CREATED);
            }
        }
        logger.info("/user Username: " + username +" not found or password wrong");
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}