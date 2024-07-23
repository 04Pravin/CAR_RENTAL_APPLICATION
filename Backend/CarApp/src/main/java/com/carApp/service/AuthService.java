package com.carApp.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carApp.model.AuthenticationResponse;
import com.carApp.model.Car;
import com.carApp.model.User;
import com.carApp.repository.IUserRepository;

@Service
public class AuthService {

	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JavaMailSender mailSender;
	
	private static final Logger logger = LoggerFactory.getLogger(Car.class);
	
    private Map<String, String> otpData = new HashMap<>();

	
	public AuthenticationResponse register(User request) throws Exception {
		User user = new User();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setEmail(request.getEmail());
		user.setMobileNumber(request.getMobileNumber());
		user.setRole(request.getRole());
		
		Optional<User> userByUsername = userRepo.findByUsername(request.getUsername());
		Optional<User> userByEmail = userRepo.findByUsername(request.getUsername());
		Optional<User> userByMobileNumber = userRepo.findByUsername(request.getUsername());
		
		if(userByUsername.isPresent())
			throw new Exception("Username already exists");
		
		if(userByEmail.isPresent())
			throw new Exception("Email already exists");
		
		if(userByMobileNumber.isPresent())
			throw new Exception("Mobile number already exists");
		
		userRepo.save(user);
		
		String token = jwtService.generateToken(user);
		
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(User request) {
		authManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
				);
		User user = userRepo.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtService.generateToken(user);
		
		return new AuthenticationResponse(token);
	}
	
	public User findCurrentUser(String username) {
		return userRepo.findByUsername(username).orElseThrow();
	}
	
	public User findUser(String username, String email) {
		return userRepo.findByUsernameAndEmail(username, email).orElseThrow();
	}
	
	public void updateUser(User user, int userId) {
		User currentUser = userRepo.findById(userId).orElseThrow();
		currentUser.setUsername(user.getUsername());
		currentUser.setPassword(passwordEncoder.encode(user.getPassword()));
		currentUser.setEmail(user.getEmail());
		currentUser.setRole(user.getRole());
		currentUser.setMobileNumber(user.getMobileNumber());
		
		userRepo.save(currentUser);

	}
	
	public void generateOtp(String email) {
		logger.info("In auth service - sending otp");
		String otp = String.valueOf(new Random().nextInt(999999));
		otpData.put(email, otp);
//		return otp;
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("pravinkumareee1404@gmail.com");
		message.setTo(email);
		message.setSubject("CAR RENTAL - OTP");
		message.setText("Your OTP code : "+ otp);
		logger.info("Sending mail");
		mailSender.send(message);
		otpData.put(email, otp);
		logger.info("Mail sent");
	}
	
//	public void sendOtp(String email, String otp) {
//		SimpleMailMessage message = new SimpleMailMessage();
//		message.setTo(email);
//		message.setSubject("CAR RENTAL - OTP");
//		message.setText("Your OTP code : "+ otp);
//		mailSender.send(message);
//	}
	
	public boolean verifyOtp(String email, String otp) {
        if (otpData.containsKey(email)) {
            String storedOtp = otpData.get(email);
            return storedOtp.equals(otp);
        }
        return false;
    }
}
