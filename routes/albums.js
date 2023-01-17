import { Router } from "express";
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// GET localhost:3000/albums
router.get('/new', albumsCtrl.new)

export {
  router
}