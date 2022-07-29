const express = require("express");
const { route } = require("./character/character");

const Characters = require("./character/character");
const Character = require("./character/character");
const Episode = require("./episode/episodes");

const router = express.Router();

// Configurar los routers

router.use("/characters", Characters);
router.use("/character", Character);
router.use("/episodes", Episode);

module.exports = router;
