package com.example.rareoddities.dao;

import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ParentalConsent;
import com.example.rareoddities.entities.ShopService;
import com.example.rareoddities.entities.TattooConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParentalConsentRepository extends JpaRepository<ParentalConsent, Long> {
    List<ParentalConsent> findByCustomer(Customer customer);
    List<ParentalConsent> findByCustomerCustomerID(Long customerID);
    Optional<ParentalConsent> findByCustomer_CustomerID(Long customerID);
    Optional<ParentalConsent> findByService(ShopService service);
    @Query("SELECT pc FROM ParentalConsent pc JOIN FETCH pc.customer JOIN FETCH pc.service WHERE pc.customer.customerID = :customerId")
    List<ParentalConsent> findByCustomerIdWithRelations(@Param("customerId") Long customerId);
}
