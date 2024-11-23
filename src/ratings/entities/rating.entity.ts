import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "../../auth/entities/user.entity";
import { Book } from "../../books/entities/book.entity";

@Schema()
export class Rating {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: string;

    @Prop({ type: Number, default: 1 })
    rate: number;

    @Prop({ type: String, ref: Book.name, required: true })
    isbn: string;

    @Prop({ type: Date, required: true, default: new Date() })
    createdAt: Date;

    @Prop({ type: Date, required: true, default: new Date() })
    updatedAt: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);