const express = require("express");
const router = express.Router();
const Post = require("../models/Post")
const { auth, authorizationPost } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title i description su obavezni" });
    }

    const newPost = new Post({
      title,
      description,
      image: image || "",
      author,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, authorizationPost, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post uspešno obrisan." });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju posta." });
  }
});

router.patch("/:id", auth, authorizationPost, async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post ne postoji." });

    if (title !== undefined) post.title = title;
    if (description !== undefined) post.description = description;
    if (image !== undefined) post.image = image;

    await post.save();

    res.json({ message: "Post uspesno izmenjen.", post });
  } catch (err) {
    res.status(500).json({ message: "Greska pri izmeni posta." });
  }
});

module.exports = router;
