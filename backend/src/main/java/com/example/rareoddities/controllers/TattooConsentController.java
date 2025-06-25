package com.example.rareoddities.controllers;

import com.example.rareoddities.entities.TattooConsent;
import com.example.rareoddities.services.TattooConsentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tattoo-consents")
@CrossOrigin(origins = "http://localhost:4200")
public class TattooConsentController {

    @Autowired
    private TattooConsentService service;

    @PostMapping
    public TattooConsent addTattooConsent(@RequestBody TattooConsent consent) {
        return service.save(consent);
    }

    @GetMapping
    public List<TattooConsent> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TattooConsent getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<TattooConsent> getByCustomer(@PathVariable Long customerId) {
        return service.findByCustomerId(customerId);
    }
}
