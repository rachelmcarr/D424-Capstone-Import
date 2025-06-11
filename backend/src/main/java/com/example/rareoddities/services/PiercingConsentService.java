package com.example.rareoddities.services;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.dao.PiercingConsentRepository;
import com.example.rareoddities.dao.ShopServiceRepository;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.PiercingConsent;
import com.example.rareoddities.entities.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PiercingConsentService {

    @Autowired
    private PiercingConsentRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    public PiercingConsent save(PiercingConsent consent) {
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

    public List<PiercingConsent> getAll() {
        return repository.findAll();
    }

    public PiercingConsent getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<PiercingConsent> findByCustomerId(Long customerId) {
        return repository.findByCustomerIdWithRelations(customerId);
    }
}
