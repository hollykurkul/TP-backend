import express from "express";
const router = express.Router();
export default router;

import {
  createEnemy,
  getEnemyById,
  getEnemiesByLocationId,
} from "#db/queries/enemies";
