package com.example.rareoddities.entities;

import jakarta.persistence.*;

@Entity
public class PiercingConsent extends ConsentForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "piercing_consentid")
    private Long piercingConsentID;

    private Boolean understandsHealingProcess;
    private Boolean agreesToAftercare;
    private Boolean consentsToPiercing;

    // --- Getters and Setters ---

    public Long getPiercingConsentID() {
        return piercingConsentID;
    }

    public void setPiercingConsentID(Long piercingConsentID) {
        this.piercingConsentID = piercingConsentID;
    }

    public Boolean getUnderstandsHealingProcess() {
        return understandsHealingProcess;
    }

    public void setUnderstandsHealingProcess(Boolean understandsHealingProcess) {
        this.understandsHealingProcess = understandsHealingProcess;
    }

    public Boolean getAgreesToAftercare() {
        return agreesToAftercare;
    }

    public void setAgreesToAftercare(Boolean agreesToAftercare) {
        this.agreesToAftercare = agreesToAftercare;
    }

    public Boolean getConsentsToPiercing() {
        return consentsToPiercing;
    }

    public void setConsentsToPiercing(Boolean consentsToPiercing) {
        this.consentsToPiercing = consentsToPiercing;
    }
}
