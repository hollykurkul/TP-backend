import express from "express";
const router = express.Router();
export default router;

import {
  createUserWeapon,
  getUserWeaponsByUserId,
  getUserWeaponByWeaponId,
} from "#db/queries/user_weapons";

import {
  createUserItem,
  getUserItemsByUserId,
  getUserItemByItemId,
} from "#db/queries/user_items";

router.params("");

router.get("/weapons/:id", async (req, res) => {});
