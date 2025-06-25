package com.example.rareoddities.services;

import com.example.rareoddities.dao.AppointmentRepository;
import com.example.rareoddities.entities.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}
