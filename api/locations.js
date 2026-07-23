import express from "express";
const router = express.Router();
export default router;

import { getAllLocations, getLocationById } from "#db/queries/locations";

router.get("/", async (req, res) => {
  const locations = await getAllLocations();
  res.send(locations);
});

router.param("id", async (req, res, next, id) => {
  const location = await getLocationById(+id);
  if (!location) return res.status(404).send("Location not found");
  req.location = location;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.location);
});
