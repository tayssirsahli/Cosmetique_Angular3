import { Classification } from "./classification.model";
import { Image } from "./image.model";

export class Cosmetique {
    idCosmetique!: number;
    nomCosmetique!: string;
    prixCosmetique!: number;
    dateCreation!: Date;
    classification!: Classification;
    image!: Image
    imageStr!: string

    images!: Image[];
}
