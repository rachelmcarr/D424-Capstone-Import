package com.example.rareoddities.dao;

import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ShopService;
import com.example.rareoddities.entities.TattooConsent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShopServiceRepository extends JpaRepository<ShopService, Long> {
    List<ShopService> findByCustomer(Customer customer);
    List<ShopService> findByCustomerCustomerID(Long customerID);
    Optional<ShopService> findByCustomer_CustomerID(Long customerID);
}
