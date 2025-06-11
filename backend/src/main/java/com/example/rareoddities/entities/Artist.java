package com.example.rareoddities.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artistID;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;



    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private String artistCategory;
    private String artistPhoto;
    private String bio;
    private String portfolioURL;
    @ElementCollection
    @CollectionTable(
            name = "artist_gallery",
            joinColumns = @JoinColumn(name = "artistID", referencedColumnName = "artistID")
    )
    @Column(name = "image_url")
    private List<String> gallery;

    // Getters and Setters

    public Long getArtistID() {
        return artistID;
    }

    public void setArtistID(Long artistID) {
        this.artistID = artistID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getArtistCategory() {
        return artistCategory;
    }

    public void setArtistCategory(String artistCategory) {
        this.artistCategory = artistCategory;
    }

    public String getArtistPhoto() {
        return artistPhoto;
    }

    public void setArtistPhoto(String artistPhoto) {
        this.artistPhoto = artistPhoto;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPortfolioURL() {
        return portfolioURL;
    }

    public void setPortfolioURL(String portfolioURL) {
        this.portfolioURL = portfolioURL;
    }

    public List<String> getGallery() {
        return gallery;
    }

    public void setGallery(List<String> gallery) {
        this.gallery = gallery;
    }
}
