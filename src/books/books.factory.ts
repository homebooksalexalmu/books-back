import { Injectable } from "@nestjs/common";
import { DEFAULT_BOOK_PAGES } from "./books.utils";
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BookFactory {

    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(bookCreatedDTO: any) {
        const imageUrl = await this.cloudinaryService.transformAndUploadAsset(bookCreatedDTO._id, bookCreatedDTO.image)
        return {
            _id: bookCreatedDTO._id,
            title: bookCreatedDTO.title,
            description: bookCreatedDTO.description,
            portrait: imageUrl,
            authors: bookCreatedDTO.attributes.authors.map(author =>
                author.includes(",")
                    ? author.split(",").reverse().join(" ").trim()
                    : author),
            pages: bookCreatedDTO.attributes.pages ?? DEFAULT_BOOK_PAGES,
            categories: [],
            publisher: bookCreatedDTO.attributes.publisher,
            format: bookCreatedDTO.attributes.format,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}