package com.example.rareoddities.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentID;

    @ManyToOne
    private ShopService service;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate scheduledTime;
    private String status;

    public Appointment() {
    }

    public Long getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Long appointmentID) {
        this.appointmentID = appointmentID;
    }

    public ShopService getService() {
        return service;
    }

    public void setService(ShopService service) {
        this.service = service;
    }

    public LocalDate getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDate scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
