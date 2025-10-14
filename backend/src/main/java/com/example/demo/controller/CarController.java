package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;
@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class CarController {
	 private final CarRepository repo;

	    public CarController(CarRepository repo) {
	        this.repo = repo;
	    }

	    @GetMapping
	    public List<Car> getAllCars() {
	        return repo.findAll();
	    }

	    @PostMapping
	    public Car addCar(@RequestBody Car car) {
	        return repo.save(car);
	    }

	    @PutMapping("/{id}")
	    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
	        Car existing = repo.findById(id).orElseThrow();
	        existing.setBrand(car.getBrand());
	        existing.setModel(car.getModel());
	        existing.setYear(car.getYear());
	        existing.setPrice(car.getPrice());
	        return repo.save(existing);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteCar(@PathVariable Long id) {
	        repo.deleteById(id);
	    }
}
