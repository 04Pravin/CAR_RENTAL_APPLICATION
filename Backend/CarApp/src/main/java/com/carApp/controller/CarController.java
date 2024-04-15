package com.carApp.controller;

import java.util.Base64;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carApp.model.Car;
import com.carApp.model.User;
import com.carApp.repository.IUserRepository;
import com.carApp.service.ICarService;

@RestController
@RequestMapping("car-api")
@CrossOrigin("http://localhost:4200/")
public class CarController {

	@Autowired
	private ICarService carService;
	
	@Autowired
	private IUserRepository userRepo;
	
	
	private static final Logger logger = LoggerFactory.getLogger(Car.class);
	
	@PostMapping("cars/signUp")
	ResponseEntity<User> addUser(@RequestBody User user){
		return ResponseEntity.ok(userRepo.save(user));
	}
	
	
	@GetMapping("cars/all")
	public List<Car> getCars() {
		List<Car> cars = carService.getAll();
		for (Car car : cars) {
			String base64Image = Base64.getEncoder().encodeToString(car.getImage());
			car.setImageData(base64Image);
		}

		return cars;
	}

	@PostMapping("cars")
	ResponseEntity<?> addCar(@RequestBody Car car) {

		logger.info("Adding a car - Controller");

		car.setImage(Base64.getDecoder().decode(car.getImageData()));

		carService.addCar(car);
		System.out.println("In controller - adding a car");
		System.out.println(car);
		String successMessage = "Car added successfully";
	    return ResponseEntity.ok().body(Collections.singletonMap("message", successMessage));

	}
	
	@PutMapping("cars/carId/{carId}")
	ResponseEntity<?>updateCar(@PathVariable("carId")int carId , @RequestBody Car car){
		
		logger.info("Updating car - Controller");
		car.setImage(Base64.getDecoder().decode(car.getImageData()));
		
		Car existingCar = carService.getById(carId);
		
		existingCar.setName(car.getName());
		existingCar.setCategory(car.getCategory());
		existingCar.setFuel(car.getFuel());
		existingCar.setGearSystem(car.getGearSystem());
		existingCar.setImage(car.getImage());
		existingCar.setMilage(car.getMilage());
		existingCar.setRatings(car.getRatings());
		existingCar.setRent(car.getRent());
		existingCar.setSeats(car.getSeats());

		carService.updateCar(existingCar);
		
		String successMessage = "Car updated successfully";
	    return ResponseEntity.ok().body(Collections.singletonMap("message", successMessage));
	}

	@GetMapping("cars/carId/{carId}")
	ResponseEntity<Car> getById(@PathVariable("carId") int carId) {
		Car car = carService.getById(carId);
		String base64Image = Base64.getEncoder().encodeToString(car.getImage());
		car.setImageData(base64Image);
		return ResponseEntity.status(HttpStatus.OK).header("info", "Get by id").body(car);
	}

	@DeleteMapping("cars/carId/{carId}")
	ResponseEntity<Void> deleteCar(@PathVariable("carId") int carId) {
		carService.deleteCar(carId);
		return ResponseEntity.status(HttpStatus.OK).header("info", "deleting a car").build();
	}

	@PostMapping("/cars/carId/{carId}/upload-image")
	public ResponseEntity<String> uploadImage(@PathVariable("carId") int carId, @RequestBody MultipartFile image) {
		carService.uploadImage(carId, image);
		return ResponseEntity.ok("Image uploaded successfully.");
	}

	@GetMapping("/cars/image/{carId}")
	public ResponseEntity<byte[]> getImage(@PathVariable int carId) {
//		Car carImage = carService.getById(carId);
//		
//		if(carImage != null) {
//			Car car = carImage.get();
//			
//			HttpHeaders headers = new HttpHeaders();
//	        headers.setContentType(MediaType.IMAGE_JPEG);
//	        
//	        return new ResponseEntity<>(car.getImage(), headers, HttpStatus.OK);
//		}
//		else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
		return null;
	}

	
}
