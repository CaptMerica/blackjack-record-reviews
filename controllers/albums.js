import { Album } from "../models/album.js"

function index (req, res) {
Album.find ({})
.then(albums => {
  console.log("albums");
  res.render("albums/index", {
    albums,
    title: "All Albums"
  })
})
}

function newAlbum (req, res) {
  res.render("albums/new", {
    title: "Add an album Review",
  })
}

function create (req, res) {
  Album.create (req.body)
  .then (album => {
    res.redirect ("/albums")
  })
  .catch (err => {
    console.log(err);
    res.redirect("/")
  })
}

export {
  index,
  newAlbum as new,
  create
}