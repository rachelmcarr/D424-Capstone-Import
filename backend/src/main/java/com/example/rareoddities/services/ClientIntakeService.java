package com.example.rareoddities.services;

import com.example.rareoddities.dao.ClientIntakeRepository;
import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.entities.ClientIntake;
import com.example.rareoddities.entities.TattooConsent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientIntakeService {
    @Autowired
    private ClientIntakeRepository intakeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<ClientIntake> getAll() {
        return intakeRepository.findAll();
    }

    public List<ClientIntake> findByCustomerId(Long customerId) {
        return intakeRepository.findByCustomerCustomerID(customerId);
    }

    public ClientIntake save(ClientIntake intake) {
        return intakeRepository.save(intake);
    }
}
