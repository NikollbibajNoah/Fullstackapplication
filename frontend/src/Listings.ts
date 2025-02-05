export interface Listing {
    id: string;
    name: string;
    description: string;
    price: number;
    images: Images;
}

interface Images {
    thumbnail_url: string | undefined;
    medium_url: string | undefined;
    picture_url: string | undefined;
    xl_picture_url: string | undefined;
}