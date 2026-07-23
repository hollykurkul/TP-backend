import express from "express";
const router = express.Router();
export default router;

import {
  getAllBosses,
  getBossById,
  getBossByLocationId,
} from "#db/queries/bosses";

router.get("/", async (req, res) => {
  const bosses = await getAllBosses();
  res.send(bosses);
});

router.param("id", async (req, res, next, id) => {
  const boss = await getBossById(+id);
  if (!boss) return res.status(404).send("Boss not found");

  req.boss = boss;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.boss);
});
