import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  releaseYear: {type: Number, default: 2023},
  albumRating: {type: Number, min: 1, max: 5, default: 5}
}, {
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const albumSchema = new Schema({
  name: String,
  reviews: [reviewSchema],
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