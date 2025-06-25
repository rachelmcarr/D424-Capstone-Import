package com.example.rareoddities.controllers;

import com.example.rareoddities.entities.PiercingConsent;
import com.example.rareoddities.services.PiercingConsentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/piercing-consents")
public class PiercingConsentController {

    @Autowired
    private PiercingConsentService service;

    @GetMapping
    public List<PiercingConsent> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PiercingConsent> getById(@PathVariable Long id) {
        PiercingConsent consent = service.getById(id);
        if (consent != null) {
            return ResponseEntity.ok(consent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customer/{customerId}")
    public List<PiercingConsent> getByCustomerId(@PathVariable Long customerId) {
        return service.findByCustomerId(customerId);
    }

    @PostMapping
    public ResponseEntity<PiercingConsent> create(@RequestBody PiercingConsent consent) {
        return ResponseEntity.ok(service.save(consent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
