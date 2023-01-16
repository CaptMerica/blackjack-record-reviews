import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Review = mongoose.model("Review", reviewSchema)

export{
  Review
}