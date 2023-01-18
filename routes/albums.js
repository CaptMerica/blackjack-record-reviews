import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()


router.get("/", albumsCtrl.index)
router.get('/new', albumsCtrl.new)
router.post("/", albumsCtrl.create)
router.get("/:albumid", albumsCtrl.show)
router.get("/:albumid/edit", albumsCtrl.edit)
router.put("/:albumid", albumsCtrl.update)
router.delete("/:albumid", albumsCtrl.delete)
router.post("/:albumid/comments", albumsCtrl.addComment)

export {
  router
}