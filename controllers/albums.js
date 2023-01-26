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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}

function newAlbum (req, res) {
  res.render("albums/new", {
    title: "Add an album Review",
  })
}

function create (req, res) {
  req.body.owner = req.user.profile._id
  req.body.author = req.user.profile._id
  Album.create (req.body)
  .then (album => {
    album.reviews.push(req.body)
    album.save()
    .then(()=>{
      res.redirect ("/albums")
    })
  })
  .catch (err => {
    console.log(err);
    res.redirect("/")
  })
}


function show (req, res) {
  Album.findById(req.params.albumid)
  .populate([
    {path: "owner"},
    {path: "comments.commenter"},
    {path: "reviews"}
  ])
  .then (album => {
    res.render ("albums/show", {
      album, 
      title: album.name
    })
  })
  .catch (err => {
    console.log(err);
    res.redirect("/")
    })
}

function edit (req, res) {
  Album.findById(req.params.id)
  .then(album => {
  const reviewDoc = album.reviews.id(req.params.reviewid)
      res.render("albums/edit", {
        album,
        review: reviewDoc,
        title: "edit review"
      })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function update(req, res) {
  Album.findById(req.params.albumid)
  .then(album => {
  const reviewDoc = album.reviews.id(req.params.reviewid)
    if (reviewDoc.author.equals(req.user.profile._id)) {
      reviewDoc.set(req.body)
      album.save()
    }
    if (album.owner.equals(req.user.profile._id)) {
      album.updateOne(req.body)
      album.save()
      .then(()=> {
        res.redirect(`/albums/${album._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/albums`)
  })
}

function deleteAlbum(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    if (album.owner.equals(req.user.profile._id)) {
      album.delete()
      .then(()=> {
        res.redirect(`/albums`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/albums`)
  })
}

function editReview(req, res) {
  Album.findById(req.params.albumid)
  .then(album => {
    const reviewDoc = album.reviews.id(req.params.reviewid)
    if(reviewDoc.author.equals(req.user.profile._id)) {
      res.render("albums/edit", {
        album,
        review: reviewDoc,
        title: "edit review"
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
}

function updateReview(req, res) {
  Album.findById(req.params.albumid)
  .then(album => {
    const reviewDoc = album.reviews.id(req.params.reviewid)
    if (reviewDoc.author.equals(req.user.profile._id)) {
      reviewDoc.set(req.body)
      album.save()
      .then(()=> {
        res.redirect(`/albums/${album._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/albums`)
  })
}


function addComment(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    req.body.commenter = req.user.profile._id
    album.comments.push(req.body)
    album.save()
    .then(()=> {
      res.redirect(`/albums/${album._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/albums')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function editComment (req, res) {
  Album.findById(req.params.id)
  .then(album => {
    const comment = album.comments.id(req.params.commentId)
    if (comment.commenter.equals(req.user.profile._id)) {
      res.render('albums/editComment', {
        album, 
        comment,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function updateComment(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    const comment = album.comments.id(req.params.commentId)
    if (comment.commenter.equals(req.user.profile._id)) {
      comment.set(req.body)
      album.save()
      .then(() => {
        res.redirect(`/albums/${album._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/albums')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function deleteComment(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    const comment = album.comments.id(req.params.commentId)
    if (comment.commenter.equals(req.user.profile._id)) {
      album.comments.remove(comment)
      album.save()
      .then(() => {
        res.redirect(`/albums/${album._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/albums')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

export {
  index,
  isLoggedIn,
  newAlbum as new,
  create,
  show,
  edit,
  update,
  deleteAlbum as delete,
  editReview,
  updateReview,
  addComment,
  editComment,
  updateComment,
  deleteComment
}