const express = require("express");
const galleryRouter = express.Router();
const imageService = require("../service/image-service");
const GallerySchema = require("../model/gallery");

const NATURE_TAB = "nature";
const FOOD_DRINK_TAB = "food-drink";
const FILMS = "films";

const supportTabs = [NATURE_TAB, FOOD_DRINK_TAB, FILMS];
const checkValidTab = (tabName) => tabName && supportTabs.indexOf(tabName) >= 0;

const getGalleryContentWithTabName = async (req, res) => {
  const { tab } = req.params;
  if (!checkValidTab(tab)) {
    return res.status(400).json({ message: "Invalid tab name" });
  }
  const result = await GallerySchema.findOne({ category: tab });
  if (result._doc) {
    res.status(200).json({
      title: result._doc.title,
      description: result._doc.description,
      images: result._doc.images
    });
  } else {
    res.status(400).send();
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
  const loadImageApi = await imageService.loadImage(
    `/${tab}`,
    filename,
    width,
    height
  );
  if (loadImageApi) {
    loadImageApi.pipe(res);
  } else {
    res.status(500).json({ message: "Have error during read stream image" });
  }
};

galleryRouter.get("/:tab", getGalleryContentWithTabName);
galleryRouter.get("/:tab/image/:filename", loadImageForTabName);

module.exports = galleryRouter;
