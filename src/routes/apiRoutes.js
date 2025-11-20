import express from "express";
import {
  getHome,
  getManhwaPopular as getManhwaPopularOld,
  getManhwaRecommendation,
  getManhwaNew as getManhwaNewOld,
  getManhwaTop,
  getGenres,
  getGenreId,
  getGenreIdPage,
  getSearch as getSearchOld,
  getSearchPage,
  getManhwaDetail as getManhwaDetailOld,
  getManhwaOnGoing,
  getChapter as getChapterOld,
  getList
} from "../controllers/scrapingController.js";

import {
  getManhwaNew,
  getManhwaPopular,
  getManhwaDetail,
  getChapter,
  getSearch
} from "../controllers/apiController.js";

const router = express.Router();

router.get("/home", getHome);
router.get("/manhwa-popular", getManhwaPopular);
router.get("/manhwa-recommendation", getManhwaRecommendation);
router.get("/manhwa-new", getManhwaNew);
router.get("/manhwa-top", getManhwaTop);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getGenreId);
router.get("/genre/:genreId/page/:pageNumber", getGenreIdPage);
router.get("/search/:searchId", getSearch);
router.get("/search/:searchId/page/:pageNumber", getSearchPage);
router.get("/manhwa-detail/:manhwaId", getManhwaDetail);
router.get("/manhwa-ongoing", getManhwaOnGoing);
router.get("/chapter/:chapterId", getChapter);
router.get("/list", getList);

export default router;
