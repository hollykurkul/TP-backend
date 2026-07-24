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

router.get("/:id/image", async (req, res) => {
  const imageResponse = await fetch(req.character.image_url);

  if (!imageResponse.ok) {
    return res.status(502).send("Unable to load the character image.");
  }

  const contentType = imageResponse.headers.get("content-type") ?? "";

  if (!contentType.startsWith("image/")) {
    return res.status(502).send("The character image source was invalid.");
  }

  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  res.set({
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=86400",
  });
  res.send(imageBuffer);
});

router.get("/:id", (req, res) => {
  res.send(req.character);
});
