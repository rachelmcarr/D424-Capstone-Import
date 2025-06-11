package com.example.rareoddities.controllers;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ShopService;
import com.example.rareoddities.entities.TattooConsent;
import com.example.rareoddities.services.ShopServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200")
public class ShopServiceController {

    @Autowired
    private ShopServiceService service;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<ShopService> getAllServices() {
        return service.getAll();
    }

    @PostMapping
    public ShopService addService(@RequestBody ShopService shopService) {
        if (shopService.getCustomer() != null && shopService.getCustomer().getCustomerID() != null) {
            Long customerId = shopService.getCustomer().getCustomerID();
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + customerId));
            shopService.setCustomer(customer);
        } else {
            shopService.setCustomer(null); // explicitly allow null
        }

        return service.save(shopService);
    }


    @PutMapping("/{id}")
    public ShopService updateService(@PathVariable Long id, @RequestBody ShopService updatedService) {
        return service.updateService(id, updatedService);
    }

    @GetMapping("/customer/{customerId}")
    public List<ShopService> getByCustomer(@PathVariable Long customerId) {
        return service.findByCustomerId(customerId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        service.deleteShopService(id);
        return ResponseEntity.noContent().build();
    }
}
