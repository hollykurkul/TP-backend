import db from "#db/client";

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
