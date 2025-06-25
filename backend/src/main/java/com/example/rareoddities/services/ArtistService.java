package com.example.rareoddities.services;

import com.example.rareoddities.entities.Artist;
import com.example.rareoddities.dao.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    public List<Artist> getAll() {
        return artistRepository.findAll();
    }

    public Artist save(Artist artist) {
        return artistRepository.save(artist);
    }

    public void delete(Long id) {
        artistRepository.deleteById(id);
    }

    public Optional<Artist> getById(Long id) {
        return artistRepository.findById(id);
    }

    public Artist addImageToGallery(Long id, String imageUrl) {
        Artist artist = artistRepository.findById(id).orElseThrow(() -> new RuntimeException("Artist not found"));
        artist.getGallery().add(imageUrl);
        return artistRepository.save(artist);
    }
}

