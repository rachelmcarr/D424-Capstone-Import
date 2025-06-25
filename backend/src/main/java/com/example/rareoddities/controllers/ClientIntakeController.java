package com.example.rareoddities.controllers;

import com.example.rareoddities.dao.ClientIntakeRepository;
import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.dao.ShopServiceRepository;
import com.example.rareoddities.entities.ClientIntake;
import com.example.rareoddities.entities.Customer;
import com.example.rareoddities.entities.ShopService;
import com.example.rareoddities.services.ClientIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.rareoddities.dto.ClientIntakeDTO;

import java.util.List;

@RestController
@RequestMapping("/api/client-intakes")
public class ClientIntakeController {

    private final ClientIntakeService clientIntakeService;

    @Autowired
    private ClientIntakeRepository intakeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShopServiceRepository shopServiceRepository;


    @Autowired
    public ClientIntakeController(
            ClientIntakeService clientIntakeService,
            CustomerRepository customerRepository,
            ShopServiceRepository shopServiceRepository
    ) {
        this.clientIntakeService = clientIntakeService;
        this.customerRepository = customerRepository;
        this.shopServiceRepository = shopServiceRepository;
    }

    @GetMapping
    public List<ClientIntake> getAllIntakes() {
        return clientIntakeService.getAll();
    }

    @GetMapping("/customer/{id}")
    public List<ClientIntake> getByCustomerId(@PathVariable Long id) {
        return clientIntakeService.findByCustomerId(id);
    }

    @PostMapping
    public ResponseEntity<ClientIntake> addIntake(@RequestBody ClientIntakeDTO intakeDTO) {
        Customer customer = customerRepository.findById(intakeDTO.getCustomerID())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        ShopService service = shopServiceRepository.findById(intakeDTO.getServiceID())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        ClientIntake intake = new ClientIntake();
        intake.setCustomer(customer);
        intake.setService(service);
        intake.setDateSubmitted(intakeDTO.getDateSubmitted());
        intake.setHasAllergies(intakeDTO.getHasAllergies());
        intake.setAllergyDetails(intakeDTO.getAllergyDetails());
        intake.setTakesMedications(intakeDTO.getTakesMedications());
        intake.setMedicationDetails(intakeDTO.getMedicationDetails());
        intake.setHasMedicalConditions(intakeDTO.getHasMedicalConditions());
        intake.setConditionDetails(intakeDTO.getConditionDetails());
        intake.setMinor(intakeDTO.getIsMinor());

        ClientIntake saved = clientIntakeService.save(intake);
        return ResponseEntity.ok(saved);
    }
}
