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
router.post("/:id/comments", isLoggedIn, albumsCtrl.addComment)
router.delete("/:id", isLoggedIn, albumsCtrl.delete)

export {
  router
}