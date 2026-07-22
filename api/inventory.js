import express from "express";
const router = express.Router();
export default router;

import { getUserInventory } from "#db/queries/inventory";

router.get("/", async (req, res) => {
  const inventory = await getUserInventory();
  res.send(inventory);
});
