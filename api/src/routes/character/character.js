const express = require("express");
const {
  /* getApiInfo, */
  getAllInfo,

  /*  getDbMostrar, */
} = require("../../controllers/Characters.controllers");
const { Character, Episode } = require("../../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiInfoTotal = await getAllInfo();

    apiInfoTotal
      ? res.status(200).send(apiInfoTotal)
      : res.status(404).send("No hay datos");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, species, origin, image } = req.body;
    const { episodes } = req.body;
    const newCharacter = await Character.create({
      name,
      species,
      origin,
      image,
    });
    const episodeDb = await Episode.findAll({
      where: {
        name: episodes,
      },
    });
    newCharacter.addEpisode(episodeDb);

    newCharacter
      ? res.status(201).send(newCharacter)
      : res.status(404).send("Error al crear el personaje");

    return newCharacter;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
