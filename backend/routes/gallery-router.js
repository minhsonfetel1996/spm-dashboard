const express = require("express");
const galleryRouter = express.Router();
const imageService = require("../service/image-service");
const GallerySchema = require("../model/gallery");

const NATURE_TAB = "nature";
const FOOD_DRINK_TAB = "food-drink";
const FILMS = "films";
const SUPPORT_TABS = [NATURE_TAB, FOOD_DRINK_TAB, FILMS];

const checkValidTab = (tabName) =>
  tabName && SUPPORT_TABS.indexOf(tabName) >= 0;

const getGalleryContentWithTabName = async (req, res) => {
  const tab = req.params.tab;
  let { skip, limit } = req.query;

  if (!checkValidTab(tab)) {
    return res.status(400).json({ message: "Invalid tab name" });
  }

  if (skip && skip.toString().trim() && limit && limit.toString().trim()) {
    skip = parseInt(skip < 0 ? 0 : skip);
    limit = parseInt(limit < 0 ? 6 : limit);
  }

  try {
    const result = await GallerySchema.findOne({ category: tab });
    if (result._doc) {
      return res.status(200).json({
        ...result._doc,
        images: result._doc.images.slice(skip, skip + limit),
        hasMore: result._doc.images.length - (skip + limit) > 0,
      });
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    return res.status(500).json({msg: "Have error during getting gallery content with tab name: " + tab});
  }
};

const buildResponseHeaderForDownloadFile = (req, res) => {
  if (req.query.downloadDialog) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.params.filename}`
    );
  }
};

const loadImageForTabName = async (req, res) => {
  const { tab, filename } = req.params;
  if (!checkValidTab(tab)) {
    return res.status(400).json({ message: "Invalid tab name" });
  }
  res.type(`image/${req.query.format || "jpeg"}`);
  const width = req.query.width ? +req.query.width : undefined;
  const height = req.query.height ? +req.query.height : undefined;
  buildResponseHeaderForDownloadFile(req, res);
  try {
    const loadImageApi = await imageService.loadImage(
      `/${tab}`,
      filename,
      width,
      height
    );
    loadImageApi.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Have error during read stream image" });
  }
};

galleryRouter.get("/:tab", getGalleryContentWithTabName);
galleryRouter.get("/:tab/image/:filename", loadImageForTabName);

module.exports = galleryRouter;
