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
    private Host host;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Images {
        private String thumbnail_url;
        private String medium_url;
        private String picture_url;
        private String xl_picture_url;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Host {
        private String host_id;
        private String host_name;
        private String host_location;
        private String host_picture_url;
    }
}
