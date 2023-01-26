import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()


router.get("/", albumsCtrl.index)
router.post("/", isLoggedIn, albumsCtrl.create)
router.get('/new', albumsCtrl.new)
router.get("/:albumid", albumsCtrl.show)
router.get("/:id/edit", isLoggedIn, albumsCtrl.edit)
router.put("/:albumid", isLoggedIn, albumsCtrl.update)
router.get("/:albumid/reviews/:reviewid/edit", isLoggedIn, albumsCtrl.editReview)
router.put("/:id/reviews/:reviewid", isLoggedIn, albumsCtrl.updateReview)

router.post("/:id/comments", isLoggedIn, albumsCtrl.addComment)
router.get("/:id/comments/:commentId/edit", isLoggedIn, albumsCtrl.editComment)
router.put("/:id/comments/:commentId", isLoggedIn, albumsCtrl.updateComment)

router.delete("/:id", isLoggedIn, albumsCtrl.delete)
router.delete("/:id/comments/:commentId", isLoggedIn, albumsCtrl.deleteComment)

export {
  router
}