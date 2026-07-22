import express from "express";
const router = express.Router();
export default router;

import { createEnemy, getAllEnemies, getEnemyById, updateEnemy, deleteEnemy } from "#db/queries/enemies";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.get("/", async (req, res) => {
    const enemies = await getAllEnemies();
    res.send(enemies);
});

router.post("/". requireBody(["name", "description", "health", "attack", "defense"]) , async (req, res) => {
    const { name, description, health, attack, defense } = req.body;
    const enemy = await createEnemy(name, description, health, attack, defense);
    res.status(201).send(enemy);
});

router.param("id", async (req, res, next, id) => {
    const enemy = await getEnemyById(id);
    if (!enemy) return res.status(404).send("Enemy not found");
    req.enemy = enemy;
    next();
});

router.get("/:id", async (req, res) => {
    res.send(req.enemy);
});

router.put("/:id", requireBody(["name", "description", "health", "attack", "defense"]), async (req, res) => {
    const { name, description, health, attack, defense } = req.body;
    const updatedEnemy = await updateEnemy(req.enemy.id, name, description, health, attack, defense);
    res.send(updatedEnemy);
});