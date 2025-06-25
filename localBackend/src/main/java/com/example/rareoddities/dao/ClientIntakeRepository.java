package com.example.rareoddities.dao;

import com.example.rareoddities.entities.ClientIntake;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ShopService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientIntakeRepository extends JpaRepository<ClientIntake, Long> {
    List<ClientIntake> findByCustomer(Customer customer);
    List<ClientIntake> findByCustomerCustomerID(Long customerID);
    List<ClientIntake> findByCustomer_CustomerID(Long customerID);
    List<ClientIntake> findByService(ShopService service);
}
