import mongoose from "mongoose";

const Schema = mongoose.Schema


const commentSchema = new Schema({
  content: String,
  commenter: {type: Schema.Types.ObjectId, ref: "Profile"},
})

const albumSchema = new Schema({
  name: String,
  releaseYear: {type: Number, default: 2023},
  review: String,
  comments: [commentSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  imageURL: String
}, {
  bestSong: String,
}, {
  timestamps: true,
})



const Album = mongoose.model('Album', albumSchema)

export {
  Album
}