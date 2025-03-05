package com.example.demo.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {

    /**
     * Find a user by userId.
     *
     * @param userId The unique identifier of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    Optional<User> findByUserId(int userId);

    /**
     * Find a user by email.
     *
     * @param email The email of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    Optional<User> findByEmail(String email);

    /**
     * Find a user by username.
     *
     * @param username The username of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    Optional<User> findByUsername(String username);

    /**
     * Check if a user exists by email.
     *
     * @param email The email to check.
     * @return True if a user with the email exists, otherwise false.
     */
    boolean existsByEmail(String email);

    /**
     * Check if a user exists by username.
     *
     * @param username The username to check.
     * @return True if a user with the username exists, otherwise false.
     */
    boolean existsByUsername(String username);

    /**
     * Delete a user by userId.
     *
     * @param userId The unique identifier of the user to delete.
     */
    void deleteByUserId(int userId);
}