import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  nick?: string;

  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: Boolean, required: true, default: false })
  verified: boolean;

  @Prop({ unique: true, type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  picture: string;

  @Prop({ type: String, unique: true, required: true })
  auth0Id: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
