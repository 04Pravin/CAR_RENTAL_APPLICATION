package com.carApp.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.carApp.model.Car;

public interface ICarService {
	
	void addCar(Car car);
	
	void updateCar(Car car);
	
	void deleteCar(int carId);
	
	List<Car>getAll();
	
	Car getById(int id);
	
	void uploadImage(int id, MultipartFile image);
}
