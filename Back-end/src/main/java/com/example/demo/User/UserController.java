package com.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Signup endpoint
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.signup(user);
    }

    // Login endpoint
    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

    // Forgot password endpoint
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email, @RequestParam String newPassword) {
        boolean success = userService.forgotPassword(email, newPassword);
        return success ? "Password reset successfully" : "User not found";
    }




    @GetMapping("/get-user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user); // Return 200 OK with user data
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 Not Found
        }
    }
}