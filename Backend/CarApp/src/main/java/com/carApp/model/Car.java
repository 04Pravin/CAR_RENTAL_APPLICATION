package com.carApp.model;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Transient;

@Entity
public class Car {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "car_sequence")
    @SequenceGenerator(name = "car_sequence", sequenceName = "car_seq")
	private Integer id;
	private String name;
	private double rent;
	private double milage;
	private String category;
	private String fuel;
	private double ratings;
	private String gearSystem;
	private int seats;
	@Lob
    private byte[] image;
	
	@Transient
    private String imageData;
	
	public Car() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Car(String name, double rent, double milage, String category, String fuel, double ratings, String gearSystem,
			int seats) {
		super();
		this.name = name;
		this.rent = rent;
		this.milage = milage;
		this.category = category;
		this.fuel = fuel;
		this.ratings = ratings;
		this.gearSystem = gearSystem;
		this.seats = seats;
	}

	public Car(String name, double rent, double milage, String category, String fuel, double ratings, String gearSystem,
			int seats, byte[] image) {
		super();
		this.name = name;
		this.rent = rent;
		this.milage = milage;
		this.category = category;
		this.fuel = fuel;
		this.ratings = ratings;
		this.gearSystem = gearSystem;
		this.seats = seats;
		this.image = image;
		
	}
	
	


	public Car(String name, double rent, double milage, String category, String fuel, double ratings, String gearSystem,
			int seats, String imageData) {
		super();
		this.name = name;
		this.rent = rent;
		this.milage = milage;
		this.category = category;
		this.fuel = fuel;
		this.ratings = ratings;
		this.gearSystem = gearSystem;
		this.seats = seats;
		this.imageData = imageData;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public double getRent() {
		return rent;
	}


	public void setRent(double rent) {
		this.rent = rent;
	}


	public double getMilage() {
		return milage;
	}


	public void setMilage(double milage) {
		this.milage = milage;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public String getFuel() {
		return fuel;
	}


	public void setFuel(String fuel) {
		this.fuel = fuel;
	}


	public double getRatings() {
		return ratings;
	}


	public void setRatings(double ratings) {
		this.ratings = ratings;
	}


	public String getGearSystem() {
		return gearSystem;
	}


	public void setGearSystem(String gearSystem) {
		this.gearSystem = gearSystem;
	}


	public int getSeats() {
		return seats;
	}


	public void setSeats(int seats) {
		this.seats = seats;
	}


	public byte[] getImage() {
		return image;
	}


	public void setImage(byte[] image) {
		this.image = image;
	}

	
	public String getImageData() {
		return imageData;
	}


	public void setImageData(String imageData) {
		this.imageData = imageData;
	}


	@Override
	public String toString() {
		return "Car [id=" + id + ", name=" + name + ", rent=" + rent + ", milage=" + milage + ", category=" + category
				+ ", fuel=" + fuel + ", ratings=" + ratings + ", gearSystem=" + gearSystem + ", seats=" + seats
				+ ", image=" + Arrays.toString(image) + ", imageData=" + imageData + "]";
	}


	
	
	
}
