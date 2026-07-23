import express from "express";
const router = express.Router();
export default router;

import {
  getAllEnemies,
  getEnemyById,
  getEnemiesByLocationId,
} from "#db/queries/enemies";

router.get("/", async (req, res) => {
  const enemies = await getAllEnemies();
  res.send(enemies);
});

router.param("locationId", async (req, res, next, locationId) => {
  const enemies = await getEnemiesByLocationId(+locationId);
  if (!enemies) return res.status(404).send("Enemies not found");
  req.enemies = enemies;
  next();
});

router.get("/:locationId", (req, res) => {
  res.send(req.enemies);
});

router.param("id", async (req, res, next, id) => {
  const enemy = await getEnemyById(+id);
  if (!enemy) return res.status(404).send("Enemy not found");
  req.enemy = enemy;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.enemy);
});
