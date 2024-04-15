package com.carApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carApp.model.Car;

public interface ICarRepository extends JpaRepository<Car, Integer>{

}
