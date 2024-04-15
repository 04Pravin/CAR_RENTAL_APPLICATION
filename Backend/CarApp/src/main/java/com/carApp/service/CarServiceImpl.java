package com.carApp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.carApp.model.Car;
import com.carApp.repository.ICarRepository;

@Service
public class CarServiceImpl implements ICarService {

	@Autowired
	private ICarRepository carRepo;
	
	@Override
	public void addCar(Car car) {
		carRepo.save(car);

	}

	@Override
	public void updateCar(Car car) {
		carRepo.save(car);

	}

	@Override
	public void deleteCar(int carId) {
		carRepo.deleteById(carId);

	}

	@Override
	public List<Car> getAll() {
		// TODO Auto-generated method stub
		return carRepo.findAll();
	}

	@Override
	public Car getById(int id) {
		if(carRepo.findById(id)==null)
			return null;
		else
			return carRepo.findById(id).get();
	}

	@Override
	public void uploadImage(int id, MultipartFile image) {
		Car car = carRepo.findById(id).get();
		try {
			if (image != null && !image.isEmpty())
				car.setImage(image.getBytes());
		} catch (IOException e) {
			throw new IllegalArgumentException("Image file is null or empty");
		}
		
		carRepo.save(car);
	}

}
