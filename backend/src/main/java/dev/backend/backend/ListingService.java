package dev.backend.backend;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ListingService {
    
    @Autowired
    private ListingRepository listingRepository;
   
    public List<Listing> getListings(int page, int size, double minPrice, double maxPrice) {
        Pageable pageable = PageRequest.of(page, size);

        return listingRepository.findByPriceBetween(minPrice, maxPrice, pageable);
    }

    public Optional<Listing> getListingById(String id) {
        return listingRepository.findById(id);
    }

    // public long countListings() {
    //     return listingRepository.count();
    // }

    public long countListings(double minPrice, double maxPrice) {
        return listingRepository.countByFilter(minPrice, maxPrice);
    }
}
