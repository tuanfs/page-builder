import mongoose from "mongoose"
const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
    },
    img: {type: String},
  },
  {timestamps: true},
)

export default mongoose.model("products", ProductSchema)
