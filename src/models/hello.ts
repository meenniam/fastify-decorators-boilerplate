import { Schema, Document, model, Model } from 'mongoose';
export interface HelloAttrs {
  message: string;
}

export interface HelloDocument extends Document {
  message: string;
}

export interface HelloModel extends Model<HelloDocument> {
  // eslint-disable-next-line
  addOne(doc: HelloAttrs): HelloDocument;
}

export const helloSchema: Schema = new Schema(
  {
    message: {
      type: String,
      required: true
    }
  },
  { collection: 'hello' }
);

export const Hello = model<HelloDocument, HelloModel>('Hello', helloSchema);

helloSchema.statics.addOne = (doc: HelloAttrs) => {
  return new Hello(doc);
};
