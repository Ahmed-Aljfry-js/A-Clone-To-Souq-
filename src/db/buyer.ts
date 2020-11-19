import { Document, model, Model, Schema } from "mongoose";

//? The packages to authenticate
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//TODO hash the password before saving it
//TODO return the user data after saving it

//? The schema to the buyer model
const buyerSchema: Schema = new Schema(
  {
    fn: {
      type: String,
      alias: "firstName",
      maxlength: 30,
      minlength: 8,
      trim: true,
      required: true,
    },
    ln: {
      type: String,
      alias: "lastName",
      maxlength: 30,
      minlength: 8,
      trim: true,
      required: true,
    },
    img: [
      {
        alias: "image",
        ref: "Image",
        type: Schema.Types.ObjectId,
      },
    ],
    pw: {
      type: String,
      alias: "password",
      minlength: 8,
      required: true,
    },
    em: {
      type: String,
      alias: "email",
      minlength: 10,
      required: true,
      unique: true,
    },
    tokens: [{ type: String }],
    a: {
      type: Number,
      alias: "age",
      min: 12,
      required: true,
    },
    affiliateLink: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//? the instance methods to the buyer model

//^ Hashing passwords before saving them
buyerSchema.pre<IBuyer>("save", async function (next) {
  this.pw = await bcrypt.hash(this.pw, 8);
  next();
});

//? the static methods to the buyer model
buyerSchema.statics.SignInToUser = async function (
  email: string,
  password: string
): Promise<string | null> {
  let buyer = await Buyer.findOne({ em: email });
  if (!buyer) {
    return null;
  }

  let isMatch = await bcrypt.compare(password, buyer.pw);
  if (!isMatch) {
    return null;
  }

  let token = jwt.sign({ id: buyer._id }, "1234567890");

  if (!token) {
    return null;
  }

  await Buyer.findByIdAndUpdate(buyer._id, {
    tokens: buyer.tokens.concat([token]),
  });

  return token;
};

//? the buyer model
interface IBuyer extends Document {
  fn: string;
  ln: string;
  pw: string;
  em: string;
  a: number;
  img: any[];
  tokens: string[];
  affiliateLink: string[];
}

interface IBuyerModel extends Model<IBuyer> {
  SignInToUser: (email: string, password: string) => Promise<string | null>;
}

const Buyer: IBuyerModel = model<IBuyer, IBuyerModel>("Buyer", buyerSchema);

export default Buyer;
