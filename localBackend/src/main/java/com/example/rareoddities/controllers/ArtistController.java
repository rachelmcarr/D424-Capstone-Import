package com.example.rareoddities.controllers;

import com.example.rareoddities.entities.Artist;
import com.example.rareoddities.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    @Autowired
    private ArtistService artistService;

    @GetMapping
    public List<Artist> getAll() {
        return artistService.getAll();
    }

    @PostMapping
    public Artist create(@RequestBody Artist artist) {
        return artistService.save(artist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artist> update(@PathVariable Long id, @RequestBody Artist updated) {
        return artistService.getById(id)
                .map(existing -> {
                    existing.setFirstName(updated.getFirstName());
                    existing.setLastName(updated.getLastName());
                    existing.setEmail(updated.getEmail());
                    existing.setPhone(updated.getPhone());
                    existing.setBirthDate(updated.getBirthDate());
                    existing.setArtistCategory(updated.getArtistCategory());
                    existing.setArtistPhoto(updated.getArtistPhoto());
                    existing.setBio(updated.getBio());
                    existing.setPortfolioURL(updated.getPortfolioURL());
                    existing.setGallery(updated.getGallery());
                    return ResponseEntity.ok(artistService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        artistService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> getById(@PathVariable Long id) {
        return artistService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/gallery")
    public ResponseEntity<Artist> addToGallery(@PathVariable Long id, @RequestBody String imageUrl) {
        Artist updated = artistService.addImageToGallery(id, imageUrl);
        return ResponseEntity.ok(updated);
    }

}
