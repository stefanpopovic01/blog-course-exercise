const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Niste logovani.' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token istekao ili nevažeći.' });
  }
}

async function authorizationPost(req, res, next) {
    const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post ne postoji." });

    if (req.user.role === "admin" || post.author.toString() === req.user.id) {
      req.post = post;
      next();
    } 
    else {
      return res.status(403).json({ message: "Nemate pravo da ovo uradite." });
    }

  } catch (err) { 
      return res.status(500).json({ message: "Greska na serveru." });
    }
}

async function authorization(req, res, next) {
  try {
      if (req.user.role != "admin") {
        return res.status(401).json({ message: "Niste autentifikovani." });
      }
      next();

  } catch (err) {
    return res.status(401).json({ message: 'Nemate pristup.'});
  }
}

module.exports = { auth, authorizationPost, authorization };