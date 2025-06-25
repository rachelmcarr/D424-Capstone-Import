package com.example.rareoddities.services;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.entities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> searchByName(String name) {
        return customerRepository.searchByFullName(name);
    }

    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

}
