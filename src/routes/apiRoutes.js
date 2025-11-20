import express from "express";
import {
  getManhwaNew,
  getManhwaPopular,
  getManhwaDetail,
  getChapter,
  getSearch,
  getSearchPage,
  getManhwaTop,
  getManhwaOngoing,
  getManhwaRecommendation,
  getGenres,
  getGenreId,
  getGenreIdPage,
  getList
} from "../controllers/apiController.js";

const router = express.Router();

router.get("/manhwa-new", getManhwaNew);
router.get("/manhwa-popular", getManhwaPopular);
router.get("/manhwa-top", getManhwaTop);
router.get("/manhwa-ongoing", getManhwaOngoing);
router.get("/manhwa-recommendation", getManhwaRecommendation);
router.get("/manhwa-detail/:manhwaId", getManhwaDetail);
router.get("/chapter/:chapterId", getChapter);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getGenreId);
router.get("/genre/:genreId/page/:pageNumber", getGenreIdPage);
router.get("/search/:searchId", getSearch);
router.get("/search/:searchId/page/:pageNumber", getSearchPage);
router.get("/list", getList);

export default router;
