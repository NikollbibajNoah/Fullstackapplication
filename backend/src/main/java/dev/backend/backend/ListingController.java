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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/listings")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @GetMapping
    public ResponseEntity<List<Listing>> getListings(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "0") double minPrice,
            @RequestParam(required = false, defaultValue = "1000000") double maxPrice) {
        return new ResponseEntity<List<Listing>>(listingService.getListings(page, size, minPrice, maxPrice),
                HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Listing>> getListingById(@PathVariable String id) {
        return new ResponseEntity<Optional<Listing>>(listingService.getListingById(id), HttpStatus.OK);
    }

    // @GetMapping("/count")
    // public ResponseEntity<Long> getListingCount() {
    //     return new ResponseEntity<Long>(listingService.countListings(), HttpStatus.OK);
    // }

    @GetMapping("/count")
    public ResponseEntity<Long> getListingsCount(
            @RequestParam(required = false, defaultValue = "0") double minPrice,
            @RequestParam(required = false, defaultValue = "1000000") double maxPrice) {
        return new ResponseEntity<Long>(listingService.countListings(minPrice, maxPrice), HttpStatus.OK);
    }
}
