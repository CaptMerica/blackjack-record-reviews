import { Album } from "../models/album.js"

function newAlbum (req, res) {
  res.render("albums/new", {
    title: "Add an album Review",
  })
}

export {
  newAlbum as new
}