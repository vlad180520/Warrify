package com.example.demo.User;

import com.example.demo.User.User;
import com.example.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Signup: Save a new user
    public User signup(User user) {
        return userRepository.save(user);
    }

    // Login: Find a user by username and password
    public User login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        return null; // Return null if login fails
    }

    // Forgot Password: Update password for a user by email
    public boolean forgotPassword(String email, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().setPassword(newPassword);
            userRepository.save(user.get()); // Save the updated user
            return true;
        }
        return false; // Return false if user is not found
    }

    // Get user by userId
    public User getUserById(int userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        return user.orElse(null); // Return null if user is not found
    }

    // Check if a user exists by email
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Check if a user exists by username
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // Delete a user by userId
    public void deleteUser(int userId) {
        userRepository.deleteByUserId(userId);
    }
}