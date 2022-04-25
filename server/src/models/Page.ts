import mongoose from "mongoose"
const Schema = mongoose.Schema

const PageSchema = new Schema(
  {
    pageName: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    sections: [
      {
        spacing: {
          type: Object,
        },
        id: {
          type: String,
        },
        columnActive: {
          type: Number,
        },
        type: {
          type: String,
        },
        children: [
          {
            id: {type: String},
            children: [
              {
                content: [],
                id: {type: String},
              },
            ],
          },
        ],
      },
    ],
  },
  {timestamps: true},
)

export default mongoose.model("pages", PageSchema)
