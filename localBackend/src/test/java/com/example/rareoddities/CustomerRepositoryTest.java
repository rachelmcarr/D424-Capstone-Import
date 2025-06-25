package com.example.rareoddities;

import com.example.rareoddities.dao.CustomerRepository;
import com.example.rareoddities.entities.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@EntityScan(basePackages = "com.example.rareoddities.entities")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void testCreateCustomer() {
        Customer customer = new Customer();
        customer.setFirstName("Rachel");
        customer.setLastName("Carr");
        customer.setEmail("rachel@example.com");
        customer.setPhone("555-555-5555");

        Customer saved = customerRepository.save(customer);

        assertNotNull(saved.getCustomerID());
        assertEquals("Rachel", saved.getFirstName());
        assertEquals("Carr", saved.getLastName());
    }
}
