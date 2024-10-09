import { Types } from "mongoose"
import { BookReadsStatus } from "../reads-status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Read {

    @Prop({ type: Types.ObjectId, ref: "users" })
    user: Types.ObjectId;

    @Prop({ type: String, required: true })
    status: BookReadsStatus;

    @Prop({ type: String })
    book: string;

    @Prop({ type: Date, required: true, default: new Date() })
    createdAt: Date;

    @Prop({ type: Date, required: true, default: new Date() })
    updatedAt: Date;
}

export const ReadSchema = SchemaFactory.createForClass(Read);