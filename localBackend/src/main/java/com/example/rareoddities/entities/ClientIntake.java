package com.example.rareoddities.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class ClientIntake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long intakeID;

    @ManyToOne
    @JoinColumn(name = "customerid", referencedColumnName = "customerid", nullable = false)
    private Customer customer;

    @Transient
    private Long customerID;

    @ManyToOne
    private ShopService service;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateSubmitted;

    private Boolean hasAllergies;
    private String allergyDetails;
    private Boolean takesMedications;
    private String medicationDetails;
    private Boolean hasMedicalConditions;
    private String conditionDetails;
    private Boolean isMinor;

    public ClientIntake() {
    }

    public Long getIntakeID() {
        return intakeID;
    }

    public void setIntakeID(Long intakeID) {
        this.intakeID = intakeID;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(Long customerID) {
        this.customerID = customerID;
    }

    public ShopService getService() {
        return service;
    }

    public void setService(ShopService service) {
        this.service = service;
    }

    public LocalDateTime getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(LocalDateTime dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public Boolean getHasAllergies() {
        return hasAllergies;
    }

    public void setHasAllergies(Boolean hasAllergies) {
        this.hasAllergies = hasAllergies;
    }

    public String getAllergyDetails() {
        return allergyDetails;
    }

    public void setAllergyDetails(String allergyDetails) {
        this.allergyDetails = allergyDetails;
    }

    public Boolean getTakesMedications() {
        return takesMedications;
    }

    public void setTakesMedications(Boolean takesMedications) {
        this.takesMedications = takesMedications;
    }

    public String getMedicationDetails() {
        return medicationDetails;
    }

    public void setMedicationDetails(String medicationDetails) {
        this.medicationDetails = medicationDetails;
    }

    public Boolean getHasMedicalConditions() {
        return hasMedicalConditions;
    }

    public void setHasMedicalConditions(Boolean hasMedicalConditions) {
        this.hasMedicalConditions = hasMedicalConditions;
    }

    public String getConditionDetails() {
        return conditionDetails;
    }

    public void setConditionDetails(String conditionDetails) {
        this.conditionDetails = conditionDetails;
    }

    public Boolean getMinor() {
        return isMinor;
    }

    public void setMinor(Boolean minor) {
        isMinor = minor;
    }
}
