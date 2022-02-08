const router = require("express").Router();
const Article = require("../models/Article");

// CREATE new article
router.post("/newarticle", async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all articles
router.get("/allarticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500);
  }
});

// GET one article
router.get("/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const articleData = await Article.find({ _id: articleId });
    res.status(200).json(articleData[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
