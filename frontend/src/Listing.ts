export interface Listing {
    id: string;
    name: string;
    description: string;
    price: number;
    images: Images;
    host: Host;
}

interface Images {
    thumbnail_url: string | undefined;
    medium_url: string | undefined;
    picture_url: string | undefined;
    xl_picture_url: string | undefined;
}

interface Host {
    host_id: string;
    host_name: string;
    host_location: string;
    host_picture_url: string;
}