package com.example.rareoddities.dao;

import com.example.rareoddities.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE " +
            "LOWER(CONCAT(c.firstName, ' ', c.lastName)) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Customer> searchByFullName(@Param("name") String name);
}