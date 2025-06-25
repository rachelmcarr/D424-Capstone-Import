package com.example.rareoddities.controllers;

import com.example.rareoddities.entities.ParentalConsent;
import com.example.rareoddities.entities.TattooConsent;
import com.example.rareoddities.services.ParentalConsentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parental-consents")
@CrossOrigin(origins = "http://localhost:4200")
public class ParentalConsentController {

    @Autowired
    private ParentalConsentService parentalConsentService;

    @PostMapping
    public ParentalConsent addParentalConsent(@RequestBody ParentalConsent consent) {
        return parentalConsentService.save(consent);
    }

    @GetMapping
    public List<ParentalConsent> getAll() {
        return parentalConsentService.getAll();
    }

    @GetMapping("/{id}")
    public ParentalConsent getById(@PathVariable Long id) {
        return parentalConsentService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        parentalConsentService.delete(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<ParentalConsent> getByCustomer(@PathVariable Long customerId) {
        return parentalConsentService.findByCustomerId(customerId);
    }
}
