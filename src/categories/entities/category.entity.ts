import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {
    @Prop({ type: String, unique: true, required: true })
    name: string;

    @Prop({ type: String, required: true })
    slug: string;

    @Prop({ type: Date, required: true, default: new Date() })
    createdAt: Date;

    @Prop({ type: Date, required: true, default: new Date() })
    updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);