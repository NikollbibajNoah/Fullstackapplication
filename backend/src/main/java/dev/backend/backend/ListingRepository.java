package dev.backend.backend;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface ListingRepository extends MongoRepository<Listing, String> {
    long count();

    @Query("{ 'price' : { $gte: ?0, $lte: ?1 } }")
    List<Listing> findByPriceBetween(double minPrice, double maxPrice, Pageable pageable);
}
