import express from "express";
const router = express.Router();
export default router;

import { getBossByLocationId } from "#db/queries/bosses";

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
