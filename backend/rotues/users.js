const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, authorizationPost, authorization, blockAdminDelete } = require("../middleware/authMiddleware");

router.get("/", auth, authorization, async (req, res) => {
    try {
        const filters = {};

        if (req.query.role) filters.role = req.query.role; //  GET /users?role=admin

        const users = await User.find(filters);
        res.json(users);

    } catch (err) {
        res.status(500).json({ error: err.message, message: "Greska prilikom dohvatanja korisnika"});
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ message: "Korisnik nije pronadjen."});
        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message, message: "Greska prilikom dohvatanja korisnika"});
    }
});

router.delete("/:id", auth, authorization, blockAdminDelete, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) res.status(404).json({ message: "Korisnik nije pronadjen."});
        res.status(200).json({ message: "User obrisan.", deletedUser });

    } catch (err) {
        res.status(500).json({ error: err.message, message: "Greska prilikom brisanja korisnika"});
    }
});

module.exports = router;