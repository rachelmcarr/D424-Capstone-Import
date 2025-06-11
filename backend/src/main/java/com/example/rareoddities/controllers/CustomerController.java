package com.example.rareoddities.controllers;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAll();
    }

    @GetMapping("/search")
    public List<Customer> searchCustomers(@RequestParam String name) {
        return customerService.searchByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        updatedCustomer.setCustomerID(id);
        return customerService.save(updatedCustomer);
    }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.save(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.delete(id);
    }
}
