import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DEFAULT_BOOK_PAGES } from "../books.utils";
import { Types } from "mongoose";
import { Category } from "../../categories/entities/category.entity";

@Schema()
export class Book {
    @Prop({
        unique: true,
        required: true,
        type: String
    })
    _id: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true, default: "Sin descripción" })
    description: string;

    @Prop({ type: String, required: true })
    portrait: string;

    @Prop({ type: String, required: true, default: "Sin editorial" })
    publisher: string;

    @Prop({ type: [String], required: true, default: [] })
    authors: Array<string>;

    @Prop({ type: [Types.ObjectId], ref: Category.name, required: true, default: [] })
    categories: Array<string>;

    @Prop({ type: Number, required: true, default: DEFAULT_BOOK_PAGES })
    pages: number;

    @Prop({ type: String, required: false })
    format: string;

    @Prop({ type: Date, required: true, default: new Date() })
    createdAt: Date;

    @Prop({ type: Date, required: true, default: new Date() })
    updatedAt: Date;

};

export const BookSchema = SchemaFactory.createForClass(Book);