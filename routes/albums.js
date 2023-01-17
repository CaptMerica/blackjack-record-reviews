import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()


router.get("/", albumsCtrl.index)
// GET localhost:3000/albums
router.get('/new', albumsCtrl.new)
router.post("/", albumsCtrl.create)
router.get("/:albumid", albumsCtrl.show)

export {
  router
}