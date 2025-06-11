package com.example.rareoddities.services;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.dao.ParentalConsentRepository;
import com.example.rareoddities.dao.ShopServiceRepository;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ParentalConsent;
import com.example.rareoddities.entities.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentalConsentService {

    @Autowired
    private ParentalConsentRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    public ParentalConsent save(ParentalConsent consent) {
        if (consent.getCustomer() == null && consent.getCustomerID() != null) {
            Customer customer = customerRepository.findById(consent.getCustomerID())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            consent.setCustomer(customer);
        }

        if (consent.getService() == null && consent.getServiceID() != null) {
            ShopService service = shopServiceRepository.findById(consent.getServiceID())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            consent.setService(service);
        }

        return repository.save(consent);
    }

    public List<ParentalConsent> getAll() {
        return repository.findAll();
    }

    public ParentalConsent getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<ParentalConsent> findByCustomerId(Long customerId) {
        return repository.findByCustomerIdWithRelations(customerId);
    }
}
