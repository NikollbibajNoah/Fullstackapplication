package dev.backend.backend;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/listings")
@CrossOrigin
public class ListingController {
    
    @Autowired
    private ListingService listingService;

    @GetMapping
    public ResponseEntity<List<Listing>> getListings() {
        return new ResponseEntity<List<Listing>>(listingService.getListings(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Listing>> getListingById(@PathVariable String id) {
        return new ResponseEntity<Optional<Listing>>(listingService.getListingById(id), HttpStatus.OK);
    }
}
