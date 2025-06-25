package com.example.rareoddities.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "parental_consents")
public class ParentalConsent extends ConsentForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parental_consentid")
    private Long parentalConsentID;

    private Long intakeID;

    private boolean releaseLiability;
    private boolean confirmRelationship;
    private boolean understandsHealing;

    private String serviceDescription;
    private String parentName;
    private String parentPhone;
    private String relationship;
    private String signature;

    // --- Getters and Setters ---

    public Long getParentalConsentID() {
        return parentalConsentID;
    }

    public void setParentalConsentID(Long parentalConsentID) {
        this.parentalConsentID = parentalConsentID;
    }

    public Long getIntakeID() {
        return intakeID;
    }

    public void setIntakeID(Long intakeID) {
        this.intakeID = intakeID;
    }

    public boolean isReleaseLiability() {
        return releaseLiability;
    }

    public void setReleaseLiability(boolean releaseLiability) {
        this.releaseLiability = releaseLiability;
    }

    public boolean isConfirmRelationship() {
        return confirmRelationship;
    }

    public void setConfirmRelationship(boolean confirmRelationship) {
        this.confirmRelationship = confirmRelationship;
    }

    public boolean isUnderstandsHealing() {
        return understandsHealing;
    }

    public void setUnderstandsHealing(boolean understandsHealing) {
        this.understandsHealing = understandsHealing;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getParentPhone() {
        return parentPhone;
    }

    public void setParentPhone(String parentPhone) {
        this.parentPhone = parentPhone;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
