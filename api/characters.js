import express from "express";
const router = express.Router();
export default router;

import {
  createCharacter,
  getAllCharacters,
  getCharacterById,
} from "#db/queries/characters";

router.get("/", async (req, res) => {
  const characters = await getAllCharacters();
  res.send(characters);
});

router.param("id", async (req, res, next, id) => {
  const character = await getCharacterById(+id);
  if (!character) return res.status(404).send("Character not found");

  req.character = character;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.character);
});
