import express from "express";
const router = express.Router();
export default router;

import {
  addRandomLocationItem,
  getInventoryItemForUser,
  getUserInventory,
  removeItemFromInventory,
} from "#db/queries/inventory";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.get("/", async (req, res) => {
  const inventory = await getUserInventory(req.user.id);
  res.send(inventory);
});

router.post("/drop", async (req, res) => {
  const locationId = Number(req.body.locationId);

  if (!Number.isInteger(locationId) || locationId < 1) {
    return res.status(400).send("Location ID must be a positive integer.");
  }

  if (Math.random() >= 0.5) {
    return res.send({ dropped: false, item: null });
  }

  const item = await addRandomLocationItem(req.user.id, locationId);
  res.send({ dropped: Boolean(item), item: item ?? null });
});

router.post("/:itemId/use", async (req, res) => {
  const itemId = Number(req.params.itemId);

  if (!Number.isInteger(itemId) || itemId < 1) {
    return res.status(400).send("Item ID must be a positive integer.");
  }

  const item = await getInventoryItemForUser(req.user.id, itemId);

  if (!item) {
    return res.status(404).send("That item is not in your inventory.");
  }

  const healingMatch = /^Restores\s+(\d+)\s+heart/i.exec(item.effect);

  if (!item.can_use || !healingMatch) {
    return res.status(400).send("That item cannot restore health.");
  }

  const removedItem = await removeItemFromInventory(req.user.id, itemId);

  if (!removedItem) {
    return res.status(409).send("That item was already used or removed.");
  }

  res.send({
    item,
    healingAmount: Number(healingMatch[1]),
  });
});
