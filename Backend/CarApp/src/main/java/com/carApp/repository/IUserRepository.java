package com.carApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carApp.model.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer>{
	
	Optional<User> findByUsername(String username);
	
	Optional<User> findByUsernameAndEmail(String username, String email);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByMobileNumber(long mobileNumber);
	
}
