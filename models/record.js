import mongoose, { isObjectIdOrHexString } from "mongoose";

const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: String,
  bestSong: String,
  review: [reviewSchema],
  
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}