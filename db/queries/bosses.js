import db from "#db/client";

export const bosses = [
  { name: "Rabid Squirrel", hp: 5, locationId: 1 },
  { name: "Rival Stray", hp: 5, locationId: 2 },
  { name: "Animal Control", hp: 5, locationId: 3 },
];

export async function createBoss(name, hp, locationId) {
  const sql = `
INSERT INTO bosses
    (name, hp, location_id)
VALUES
    ($1, $2, $3)
RETURNING *
`;
  const {
    rows: [boss],
  } = await db.query(sql, [name, hp, locationId]);
  return boss;
}

export async function getBossById(id) {
  const sql = `
    SELECT *
    FROM bosses
    WHERE id = $1
    `;
  const {
    rows: [boss],
  } = await db.query(sql, [id]);
  return boss;
}

export async function getBossByLocationId(id) {
  const sql = `
    SELECT *
    FROM bosses
    WHERE location_id = $1
    `;
  const { rows: boss } = await db.query(sql, [id]);
  return boss;
}
