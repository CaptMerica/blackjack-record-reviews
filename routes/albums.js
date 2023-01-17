import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// GET localhost:3000/albums
router.get('/albums', albumsCtrl.new)

export {
  router
}