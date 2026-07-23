import express from "express";
const router = express.Router();
export default router;

import { getEnemiesByLocationId } from "#db/queries/enemies";

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
