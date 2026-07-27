import express from "express";
const router = express.Router();
export default router;

import {
  getEnemiesByLocationId,
  getEnemyById,
} from "#db/queries/enemies";
import proxyImage from "#api/proxyImage";

router.get("/location/:locationId", async (req, res) => {
  const locationId = Number(req.params.locationId);

  if (!Number.isInteger(locationId) || locationId < 1) {
    return res.status(400).send("Location ID must be a positive integer.");
  }

  const enemies = await getEnemiesByLocationId(locationId);

  if (enemies.length === 0) {
    return res.status(404).send("No enemies found for this location.");
  }

  res.send(enemies);
});

router.param("id", async (req, res, next, id) => {
  const enemy = await getEnemyById(Number(id));

  if (!enemy) return res.status(404).send("Enemy not found.");

  req.enemy = enemy;
  next();
});

router.get("/:id/image", async (req, res) => {
  return proxyImage(res, req.enemy.image_url);
});
