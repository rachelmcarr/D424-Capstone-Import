package com.example.rareoddities;

import com.example.rareoddities.entities.*;
import com.example.rareoddities.dao.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@DataJpaTest
public class TattooConsentTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;

    @Autowired
    private TattooConsentRepository tattooConsentRepository;

@Test
public void testSaveTattooConsent() {
    Customer customer = new Customer();
    customer.setFirstName("Bri");
    customer.setLastName("Fawvor");
    customer.setEmail("bri@example.com");
    customer.setPhone("555-1234");
    customer.setBirthDate(LocalDate.of(1995, 4, 15));
    customer.setAddress("123 Main St");
    customer.setCity("Beaumont");
    customer.setState("TX");
    customer.setZip("77701");
    customer.setCreatedAt(LocalDateTime.now());
    customer.setUpdatedAt(LocalDateTime.now());
    customer = customerRepository.save(customer);

    ShopService service = new ShopService();
    service.setTitle("Tattoo Consent Test");
    service.setCustomer(customer);
    service.setCreatedAt(LocalDateTime.now());
    service = shopServiceRepository.save(service);

    TattooConsent consent = new TattooConsent();
    consent.setService(service);
    consent.setCustomer(customer);
    consent.setDrugsOrAlcohol(true);
    consent.setSkinCondition(true);
    consent.setApproveDesign(true);
    consent.setNotPregnant(true);
    consent.setHasDisease(false);
    consent.setMinor(false);
    consent.setUnderstandsAllergyRisk(true);
    consent.setUnderstandsInfectionRisk(true);
    consent.setReceiptOfAftercare(true);
    consent.setUnderstandsVariation(true);
    consent.setUnderstandsPermanence(true);
    consent.setUnderstandsChoice(true);
    consent.setReleaseArtist(true);
    consent.setUnderstandsFDA(true);
    consent.setUnderstandsMedicalRisk(true);
    consent.setAgreesToAftercare(true);
    consent.setConsentsToTattoo(true);

    TattooConsent savedConsent = tattooConsentRepository.save(consent);

    Assertions.assertNotNull(savedConsent.getTattooConsentID());
    Assertions.assertTrue(savedConsent.isConsentsToTattoo());
}
}