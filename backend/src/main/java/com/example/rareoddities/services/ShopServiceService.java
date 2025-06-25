package com.example.rareoddities.services;

import com.example.rareoddities.dao.*;
import com.example.rareoddities.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceService {

    @Autowired
    private ShopServiceRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TattooConsentRepository tattooConsentRepository;

    @Autowired
    private ClientIntakeRepository clientIntakeRepository;

    @Autowired
    private PiercingConsentRepository piercingConsentRepository;

    @Autowired
    private ParentalConsentRepository parentalConsentRepository;

    public List<ShopService> getAll() {
        return repository.findAll();
    }

    public ShopService save(ShopService service) {
        if (service.getCustomer() != null && service.getCustomer().getCustomerID() != null) {
            Long customerId = service.getCustomer().getCustomerID();
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));
            service.setCustomer(customer);
        } else {
            service.setCustomer(null); // ensure null is stored if not set
        }

        return repository.save(service);
    }


    public ShopService updateService(Long id, ShopService updatedService) {
        ShopService existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with ID: " + id));

        Long customerId = updatedService.getCustomer() != null ? updatedService.getCustomer().getCustomerID() : null;
        if (customerId == null) {
            throw new IllegalArgumentException("Customer is required.");
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));

        existing.setCustomer(customer);
        existing.setImageURL(updatedService.getImageURL());
        existing.setStatus(updatedService.getStatus());
        // Add other fields you'd like to support updating

        return repository.save(existing);
    }

    public List<ShopService> findByCustomerId(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));

        List<ShopService> services = repository.findByCustomer(customer);

        for (ShopService service : services) {
            service.setTattooConsent(tattooConsentRepository.findByService(service).orElse(null));
            service.setPiercingConsent(piercingConsentRepository.findByService(service).orElse(null));
            service.setParentalConsent(parentalConsentRepository.findByService(service).orElse(null));
        }

        return services;
    }

    public void deleteShopService(Long id) {
        ShopService service = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with ID: " + id));

        // Delete related consents
        tattooConsentRepository.findByService(service).ifPresent(tattooConsentRepository::delete);
        piercingConsentRepository.findByService(service).ifPresent(piercingConsentRepository::delete);
        parentalConsentRepository.findByService(service).ifPresent(parentalConsentRepository::delete);

        // Delete related client intakes
        List<ClientIntake> intakes = clientIntakeRepository.findByService(service);
        clientIntakeRepository.deleteAll(intakes);

        // Now delete the service
        repository.delete(service);
    }
}
