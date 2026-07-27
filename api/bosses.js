import express from "express";
const router = express.Router();
export default router;

import {
  getBossById,
  getBossByLocationId,
} from "#db/queries/bosses";
import proxyImage from "#api/proxyImage";

router.get("/location/:locationId", async (req, res) => {
  const locationId = Number(req.params.locationId);

  if (!Number.isInteger(locationId) || locationId < 1) {
    return res.status(400).send("Location ID must be a positive integer.");
  }

  const [boss] = await getBossByLocationId(locationId);

  if (!boss) {
    return res.status(404).send("No boss found for this location.");
  }

  res.send(boss);
});

router.param("id", async (req, res, next, id) => {
  const boss = await getBossById(Number(id));

  if (!boss) return res.status(404).send("Boss not found.");

  req.boss = boss;
  next();
});

router.get("/:id/image", async (req, res) => {
  return proxyImage(res, req.boss.image_url);
});
