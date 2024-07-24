package com.carApp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carApp.model.AuthenticationResponse;
import com.carApp.model.Car;
import com.carApp.model.User;
import com.carApp.service.AuthService;

@RestController
@RequestMapping("auth-api")
@CrossOrigin("http://localhost:4200/")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	private static final Logger logger = LoggerFactory.getLogger(Car.class);
	
	@PostMapping("register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody User user) throws Exception{
		return ResponseEntity.ok(authService.register(user));
	}
	
	@PostMapping("login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody User user){
		return ResponseEntity.ok(authService.authenticate(user));
	}
	
	@GetMapping("username/{username}")
	public ResponseEntity<?> getCurrentUser(@PathVariable String username){
        User user = authService.findCurrentUser(username);
        return ResponseEntity.ok(user);
	}
	
	@GetMapping("resetPassword/username/{username}/email/{email}")
	public ResponseEntity<?> getUser(@PathVariable String username, @PathVariable String email){
		return ResponseEntity.ok(authService.findUser(username, email));
	}
	
	@PutMapping("update/userId/{userId}")
	public ResponseEntity<Void> updateUser(@PathVariable int userId, @RequestBody User user){
		authService.updateUser(user, userId);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@PostMapping("sendOtp")
	public ResponseEntity<Void> generateOtp(@RequestBody String email) {
		logger.info("In controller - sending otp");
		authService.generateOtp(email);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@PostMapping("verifyOtp")
	public ResponseEntity<Boolean>verifyOtp(@RequestParam String email, @RequestParam String otp){
		logger.info("In controller - verifying otp");
		
		return ResponseEntity.ok(authService.verifyOtp(email, otp));
	}
}
