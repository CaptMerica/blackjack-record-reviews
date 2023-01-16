import mongoose, { isObjectIdOrHexString } from "mongoose";

const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: String,
  reviews: [reviewSchema],
  rating: Number,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  bestSong: String,
}, {
  timestamps: true,
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}