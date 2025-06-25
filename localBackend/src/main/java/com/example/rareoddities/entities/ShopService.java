package com.example.rareoddities.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class ShopService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceID;

    @ManyToOne
    @JoinColumn(name = "artistid")
    private Artist artist;

    @ManyToOne
    @JoinColumn(name = "customerid", referencedColumnName = "customerid", nullable = true)
    @JsonIgnoreProperties({"services"})
    private Customer customer;

    @Transient
    private Long customerID;

    private String title;
    private String description;
    private String location;
    private String style;
    private String duration;
    private String status;
    private double price;
    private String imageURL;

    @Enumerated(EnumType.STRING)
    private ServiceCategory category;

    private String inkInfo;
    private String jewelryInfo;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    private String completedPhotoURL;

    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"customer", "service"})
    private TattooConsent tattooConsent;

    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"customer", "service"})
    private PiercingConsent piercingConsent;

    @OneToOne(mappedBy = "service", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"customer", "service"})
    private ParentalConsent parentalConsent;

    // Getters and Setters
    public Long getServiceID() {
        return serviceID;
    }

    public void setServiceID(Long serviceID) {
        this.serviceID = serviceID;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }

    public String getInkInfo() {
        return inkInfo;
    }

    public void setInkInfo(String inkInfo) {
        this.inkInfo = inkInfo;
    }

    public String getJewelryInfo() {
        return jewelryInfo;
    }

    public void setJewelryInfo(String jewelryInfo) {
        this.jewelryInfo = jewelryInfo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getCompletedPhotoURL() {
        return completedPhotoURL;
    }

    public void setCompletedPhotoURL(String completedPhotoURL) {
        this.completedPhotoURL = completedPhotoURL;
    }

    public TattooConsent getTattooConsent() {
        return tattooConsent;
    }

    public void setTattooConsent(TattooConsent tattooConsent) {
        this.tattooConsent = tattooConsent;
    }

    public PiercingConsent getPiercingConsent() {
        return piercingConsent;
    }

    public void setPiercingConsent(PiercingConsent piercingConsent) {
        this.piercingConsent = piercingConsent;
    }

    public ParentalConsent getParentalConsent() {
        return parentalConsent;
    }

    public void setParentalConsent(ParentalConsent parentalConsent) {
        this.parentalConsent = parentalConsent;
    }

    // Helper method for service binding
    public Long fetchServiceID() {
        return this.serviceID;
    }
}
