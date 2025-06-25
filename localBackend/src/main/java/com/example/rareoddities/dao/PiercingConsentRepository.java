package com.example.rareoddities.dao;

import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.PiercingConsent;
import com.example.rareoddities.entities.ShopService;
import com.example.rareoddities.entities.TattooConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PiercingConsentRepository extends JpaRepository<PiercingConsent, Long> {
    List<PiercingConsent> findByCustomer(Customer customer);
    List<PiercingConsent> findByCustomerCustomerID(Long customerID);
    Optional<PiercingConsent> findByService(ShopService service);
    @Query("SELECT pc FROM PiercingConsent pc JOIN FETCH pc.customer JOIN FETCH pc.service WHERE pc.customer.customerID = :customerId")
    List<PiercingConsent> findByCustomerIdWithRelations(@Param("customerId") Long customerId);
}
