# Fullstackapplication
This is a full-stack application built using Java Spring for the backend and a modern JavaScript framework for the frontend. It demonstrates the integration of a RESTful API with a dynamic user interface, providing a comprehensive example of a full-stack development project.

## Tools
In this project, we utilize a variety of tools to streamline development and ensure a robust application:

- **Java Spring**: A powerful framework for building enterprise-grade backend services. A REST Controller for all listings, fetched from external database.
- **React TypeScript**: For the frontend react is being used for full powerful controll over the user interface. The UI library **Primereact** is being used in this project, to use ready made components.
- **MongoDB**: For storing data in this project, mongodb is used for its easy and free usage.

These tools collectively enhance productivity, maintainability, and scalability of the application.

## Database Connection
To connect to the MongoDB database, follow these steps:

1. **Configure MongoDB URI**: In your `application.properties` or `application.yml` file, add the MongoDB connection string.
    ```properties
    spring.data.mongodb.uri=mongodb://localhost:27017/fullstackapplication
    ```

2. **Create a Entity**: Define a entity class to set up MongoDB properties. The `@Document()` Annotation is used for the table in the database.
    ```java
    package dev.backend.backend;

    import java.util.Date;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Document(collection = "listingsAndReviews")
    public class Listing {
        
        @Id
        private String id;
        private String name;
        private String description;
        private double price;
        private Date last_scraped;
        private Images images;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Images {
            private String thumbnail_url;
            private String medium_url;
            private String picture_url;
            private String xl_picture_url;
        }
    }
    ```

3. **Define MongoDB Repositories**: Create repository interfaces for your entities.
    ```java
    import org.springframework.data.mongodb.repository.MongoRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface ListingRepository extends MongoRepository<Listing, String> {}
    ```

4. **Use Repositories in Services**: Autowire the repositories in your service classes to perform CRUD operations.
    ```java
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

        public List<Listing> getListings() {
            Pageable pageable = PageRequest.of(0, 5);

            return listingRepository.findAll(pageable).getContent();
        }

        public Optional<Listing> getListingById(String id) {
            return listingRepository.findById(id);
        }

        // CRUD methods here
    }
    ```
    
4. **Create a REST Controller**: For work with the data in the react frontend, create a REST Controller with the methods.

    ```java
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
    ```

By following these steps, you can establish a connection to your MongoDB database and perform operations using Spring Data MongoDB.