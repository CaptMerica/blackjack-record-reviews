import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()


router.get("/", albumsCtrl.index)
router.get('/new', albumsCtrl.new)
router.post("/", isLoggedIn, albumsCtrl.create)
router.get("/:albumid", albumsCtrl.show)
router.get("/:albumid/edit", isLoggedIn, albumsCtrl.edit)
router.put("/:albumid", albumsCtrl.update)
router.delete("/:albumid", albumsCtrl.delete)
router.post("/:albumid/comments", albumsCtrl.addComment)

export {
  router
}