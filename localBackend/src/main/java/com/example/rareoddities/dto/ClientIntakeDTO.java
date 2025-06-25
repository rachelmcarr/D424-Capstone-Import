package com.example.rareoddities.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class ClientIntakeDTO {
    private Long customerID;
    private Long serviceID;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateSubmitted;
    private Boolean hasAllergies;
    private String allergyDetails;
    private Boolean takesMedications;
    private String medicationDetails;
    private Boolean hasMedicalConditions;
    private String conditionDetails;
    private Boolean isMinor;

    // Getters and setters
    public Long getCustomerID() { return customerID; }
    public void setCustomerID(Long customerID) { this.customerID = customerID; }

    public Long getServiceID() { return serviceID; }
    public void setServiceID(Long serviceID) { this.serviceID = serviceID; }

    public LocalDateTime getDateSubmitted() { return dateSubmitted; }
    public void setDateSubmitted(LocalDateTime dateSubmitted) { this.dateSubmitted = dateSubmitted; }

    public Boolean getHasAllergies() { return hasAllergies; }
    public void setHasAllergies(Boolean hasAllergies) { this.hasAllergies = hasAllergies; }

    public String getAllergyDetails() { return allergyDetails; }
    public void setAllergyDetails(String allergyDetails) { this.allergyDetails = allergyDetails; }

    public Boolean getTakesMedications() { return takesMedications; }
    public void setTakesMedications(Boolean takesMedications) { this.takesMedications = takesMedications; }

    public String getMedicationDetails() { return medicationDetails; }
    public void setMedicationDetails(String medicationDetails) { this.medicationDetails = medicationDetails; }

    public Boolean getHasMedicalConditions() { return hasMedicalConditions; }
    public void setHasMedicalConditions(Boolean hasMedicalConditions) { this.hasMedicalConditions = hasMedicalConditions; }

    public String getConditionDetails() { return conditionDetails; }
    public void setConditionDetails(String conditionDetails) { this.conditionDetails = conditionDetails; }

    public Boolean getIsMinor() { return isMinor; }
    public void setIsMinor(Boolean isMinor) { this.isMinor = isMinor; }
}