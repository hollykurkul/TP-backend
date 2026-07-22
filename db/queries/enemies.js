import db from "#db/client";

export const enemies = [
  { name: "Rabbit", hp: 3, locationId: 1 },
  { name: "Squirrel", hp: 3, locationId: 1 },
  { name: "Fox", hp: 3, locationId: 1 },
  { name: "Armadillo", hp: 3, locationId: 2 },
  { name: "Snake", hp: 3, locationId: 2 },
  { name: "Hawk", hp: 3, locationId: 2 },
  { name: "Stray Animal", hp: 3, locationId: 3 },
  { name: "Rat", hp: 3, locationId: 3 },
  { name: "Aggressive Kid", hp: 3, locationId: 3 },
];

export async function createEnemy(name, hp, locationId) {
  const sql = `
    INSERT INTO enemies
        (name, hp, location_id)
    VALUES
        ($1, $2, $3)
    `;
  const {
    rows: [enemy],
  } = await db.query(sql, [name, hp, locationId]);
  return enemy;
}

export async function getEnemyById(id) {
  const sql = `
    SELECT *
    FROM enemies
    WHERE id = $1
    `;
  const {
    rows: [enemy],
  } = await db.query(sql, [id]);
  return enemy;
}

export async function getEnemiesByLocationId(id) {
  const sql = `
    SELECT *
    FROM enemies
    WHERE location_id = $1
    `;
  const { rows: enemies } = await db.query(sql, [id]);
  return enemies;
}
